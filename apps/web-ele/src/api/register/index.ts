import { requestClient } from '#/api/request';

/**
 * 获取院区数据
 */
async function getHospitalDistrictApi() {
  return requestClient.get<RegisterApi.HospitalDistrictResponse[]>(
    '/alpha/ihis/register/hospital-districts',
  );
}

/**
 * 获取科室数据
 */
async function getDeptsApi(data: { hospitalCode: string; id: string }) {
  return requestClient.post<RegisterApi.DeptsResponse[]>(
    '/alpha/ihis/register/depts',
    data,
  );
}

/**
 * 获取医生号源
 */
async function getScheduleApi(data: {
  deptCode: string;
  endDate: string;
  hospitalCode: string;
  registerLevel: string;
  startDate: string;
  subDeptCode: string;
}) {
  return requestClient.post<RegisterApi.DoctorSchedule[]>(
    '/alpha/ihis/register/resource/schedule/day/v1',
    data,
  );
}

export { getDeptsApi, getHospitalDistrictApi, getScheduleApi };
