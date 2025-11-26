import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, of, Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient) { }

  /** Base API URL */
  private readonly BASE_URL = (environment as any)?.apiBaseUrl || '';

  /** ✅ Path for company data API */
  private readonly companyPath = 'companies';

  /** Common headers */
  private defaultHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  /** Helper: safely join base URL + path */
  private buildUrl(path: string): string {
    const base = this.BASE_URL.replace(/\/+$/, '');
    const p = path.replace(/^\/+/, '');
    return `${base}/${p}`;
  }

  /** Helper: convert plain object → HttpParams */
  private toHttpParams(obj: Record<string, any> = {}): HttpParams {
    let params = new HttpParams();
    Object.entries(obj).forEach(([key, val]) => {
      if (val === null || val === undefined) return;
      if (Array.isArray(val)) {
        val.forEach(v => params = params.append(key, String(v)));
      } else if (typeof val === 'boolean') {
        params = params.set(key, val ? 'true' : 'false');
      } else {
        params = params.set(key, String(val));
      }
    });
    return params;
  }

    saveHealthProposal(payload: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/proposals/save`, payload);
  }

  /** ✅ Step 1: Get all available health plan endpoints */
  getHealthPlanEndpoints(): Observable<any> {
    const url = `${this.BASE_URL}/${this.companyPath}/plans?policy=Health`;
    return this.http.get(url);
  }

  /** ✅ Step 2: Call each premium API with same payload */
  callAllPremiumApis(apiList: string[], payload: any) {
    const requests = apiList.map(api =>
      this.http.post(`${api}`, payload).pipe(
        catchError(err => {
          console.warn(`⚠️ Skipping failed API: ${api}`, err.message || err);
          return of(null); // return null for failed requests
        })
      )
    );
        return forkJoin(requests);

  }

    /**
     * ✅ Fetch company data from backend (GET /api/companies)
     * @param query optional filters (e.g., { city: 'Pune', active: true })
     */
    getCompanies(query: Record<string, any> = {}): Observable < any > {
      const url = this.buildUrl(`${this.companyPath}/health-plans`);
      query = { policy: 'Health' };
      const params = this.toHttpParams(query);

      return this.http
        .get<any>(url, { headers: this.defaultHeaders, params })
        .pipe(
          timeout(30000),
          catchError(err => {
            console.error('[ApicallService.getCompanies] Failed:', err);
            return throwError(() => err);
          })
        );
    }

    /**
     * ✅ Fetch plans of a specific company (GET /api/companies/:companyId/plans)
     * Matches your backend route: http://192.168.1.177:3000/api/companies/:companyid/plans
     */
    getCompanyPlans(companyId: string | number, query: Record<string, any> = {}): Observable < any > {
      const url = this.buildUrl(`${this.companyPath}/${companyId}/plans`);
      const params = this.toHttpParams(query);

      return this.http
        .get<any>(url, { headers: this.defaultHeaders, params })
        .pipe(
          timeout(30000),
          catchError(err => {
            console.error(`[ApicallService.getCompanyPlans] Failed for ${companyId}:`, err);
            return throwError(() => err);
          })
        );
    }

    /**
     * Optional: separate function for health quotes (different endpoint)
     * You can add your existing health quote API path here later
     */
    getHealthQuotes(query: Record<string, any> = {}): Observable < any > {
      const healthUrl = this.buildUrl('api/health'); // example path for health quotes
      const params = this.toHttpParams(query);

      return this.http
        .get<any>(healthUrl, { headers: this.defaultHeaders, params })
        .pipe(
          timeout(30000),
          catchError(err => {
            console.error('[ApicallService.getHealthQuotes] Failed:', err);
            return throwError(() => err);
          })
        );
    }

  }
