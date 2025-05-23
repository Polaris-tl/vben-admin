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
  export interface DoctorSchedule {
    hisId: null | string;
    company_code: null | string;
    companyCode: string;
    hospitalCode: string;
    clinicDate: string;
    deptCode: string;
    deptName: string;
    subDeptCode: string;
    subDeptName: string;
    totalResourceNum: string;
    leftResourceNum: string;
    clinicLabel: string;
    clinicFullLabel: string;
    room: string;
    timeDesc: string;
    registerLevel: string;
    doctorEmpNo: string;
    doctorName: string;
    doctorDuty: string;
    doctorDesc: string;
    doctorPhotoPath: string;
    totalCharges: string;
    stopFlag: string;
    clinicLocation: string;
    insuranceDeptCode: string;
    itemCode: string;
    itemName: string;
    itemClass: string;
    units: string;
    itemSpec: string;
    insuranceCode: string;
    doctorIdNo: string;
    departmentName: string;
    clinicLabelPinyin: string;
  }
}
