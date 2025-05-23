import type { JSX } from 'vue/jsx-runtime';

import { showDialog } from '#/components';

export const beforeSelect = async (item: RegisterApi.DoctorSchedule) => {
  let content: JSX.Element | undefined;
  let countdown = 0;
  if (
    ['2367', '2368', '4970', '4971', '何大维特需肾积水'].includes(
      item.clinicLabel,
    )
  ) {
    content = (
      <div>
        该号源只为<span style={{ color: 'red' }}>肾积水/泌尿系肿瘤</span>
        疾病小孩服务，其它疾病请挂相应专科号就诊。
      </div>
    );
  }
  if (item?.clinicFullLabel?.includes('特殊儿童疫苗接种')) {
    content = (
      <div>
        该号源为特殊健康状态儿童疫苗评估接种专病门诊
        <span style={{ color: 'red' }}>
          （周二：儿保专业、免疫专业，周三：感染专业）
        </span>
        ，非疫苗接种相关患者请挂其他号源，谢谢！
      </div>
    );
  }
  if (
    item?.clinicFullLabel?.includes('教学门诊') ||
    item?.clinicLabel?.includes('教学门诊')
  ) {
    content = (
      <div>
        <div style={{ textAlign: 'left' }}>尊敬的患者朋友：</div>
        <div style={{ textAlign: 'left', textIndent: '2em' }}>
          您好！本门诊是教学门诊，在副高及以上资深医师的全程指导下，住院医师会对您进行详细、全面的病情询问和体格检查，为您提供充分的门诊就诊时间和优质的医疗服务。门诊的临床教学能够提高住院医师的知识和经验，会为他们今后面对真实的临床环境提供很大的帮助。您的支持是对培养未来优秀医师作出的贡献！
        </div>
        <div style={{ textAlign: 'left' }}>
          温馨提醒：教学门诊是为教学专门设立的门诊，无法接待仅配药不看病的患者。感谢您的配合！
        </div>
      </div>
    );
  }
  if (
    [
      'PID移植血液/免疫联合门诊（安云飞）渝中',
      'PID移植血液/免疫联合门诊（窦颖）渝中',
    ].includes(item.clinicFullLabel || item.clinicLabel || '')
  ) {
    content = (
      <div>
        <div>
          “PID移植血液/免疫联合门诊”由血液科及免疫科医生同时在同一诊室出诊，
          <span style={{ color: 'red' }}>
            需要同时挂“PID移植血液/免疫联合门诊（窦颖）渝中”及“PID移植血液/免疫联合门诊（安云飞）渝中”同一就诊日的号，
          </span>
          若只挂了其中一人的号，则需要在现场补号。
        </div>
      </div>
    );
  }
  if (
    item.clinicFullLabel?.includes('复诊续方') ||
    item.clinicLabel?.includes('复诊续方')
  ) {
    content = (
      <div>
        <div>复诊续方（内分泌）挂号须知：</div>
        <div style={{ color: 'red' }}>
          1.仅限于有既往我院内分泌专科就诊用药记录，且不需要调整治疗方案，需开具内分泌专科药物的患者。
        </div>
        <div>
          2.慢性病当月开药总量不超过30天，
          <span style={{ color: 'red' }}>生长激素类药品不超过2周，</span>
          特殊管理类药品不超过7天。
        </div>
        <div>
          3.<span style={{ color: 'red' }}>复诊续方门诊不提供：</span>
          看病，解读检验检查报告、调整药物剂量、开具诊断证明等，如有以上需求，请挂内分泌专科门诊就诊。
        </div>
        <div>
          4.实名制就诊，病员信息与就诊不符，不能接诊，
          <span style={{ color: 'red' }}>不能为多人代开。</span>
        </div>
        <div>5.预约号须按时间签到，按就诊序号排队、呼叫器呼号、依次就诊。</div>
        <div>
          6.工作时间：周六上午8:00-11:30（具体以我院公众号门诊放号信息为准）。
        </div>
      </div>
    );
    countdown = 5;
  }
  if (
    ['疼痛门诊（涂生芬）特需两', '疼痛门诊（涂生芬）特需两加'].includes(
      item.clinicFullLabel || '',
    )
  ) {
    content = (
      <div>
        <div>
          <span style={{ color: 'red' }}>癌痛病人</span>请前往
        </div>
        <div>
          <span style={{ color: 'red' }}>渝中院区疼痛门诊</span>就诊
        </div>
      </div>
    );
  }
  if (content) {
    await showDialog({
      title: '提示',
      content,
      countdown,
    });
  }
  return true;
};
