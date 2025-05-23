declare namespace RegisterApi {
  export interface HospitalDistrictResponse {
    address: string;
    districtCode: string;
    districtName: string;
    id: string;
    noticeText: string;
  }
  export interface DeptsResponse {
    hisId: null | string;
    company_code: null | string;
    hospitalCode: string;
    deptCode: string;
    deptName: string;
    deptDesc: null | string;
    level: string;
    parentCode: null | string;
    parentName: null | string;
    children: DeptsResponse[] | null;
  }
}
