import { number, object, string, date, ref, boolean } from "yup";

export const corpSchema = object().shape({
  useYn: boolean()
    .default(true)
    .required("사용여부를 체크해주세요.")
    .oneOf([true, false]),
  coNm: string()
    .required("회사명을 입력해주세요.")
    .max(20, "회사명은 20자 이내로 입력해주세요.")
    .typeError("올바른 회사명을 입력해주세요."),
  ceoNm: string()
    .required("대표자명을 입력해주세요.")
    .max(10, "대표명은 10자 이내로 입력해주세요.")
    .typeError("올바른 대표자명을 입력해주세요."),
  postNum: string().required("우편번호를 선택해주세요."),
  addr: string().required("주소를 선택해주세요."),
  sort: number()
    .test('len', '정렬값은 10자리 이내로 입력해주세요.', sort => sort && sort.toString().length <= 10)
    .required("정렬값을 입력해주세요.")
    .positive("정렬값은 0 이상의 숫자를 입력해주세요.")
    .typeError('정렬값은 숫자를 입력해주세요.'),
  estDt: date()
    .required("설립일을 선택해주세요.")
    .typeError('설립일을 선택해주세요.'),
  bsCd: string().required("회사구분을 선택해주세요."),
  opDt: date()
    .required("개업일을 선택해주세요.")
    .min(ref('estDt'), `개업일은 설립일 이후의 날짜를 선택해주세요.`)
    .typeError('개업일을 선택해주세요.'),
  clsDt: date()
    .nullable()
    .min(ref('opDt'), `폐업일은 개업일 이후의 날짜를 선택해주세요.`)
    .typeError('폐업일을 선택해주세요.'),
  coAbb: string().nullable().max(20, "회사약칭은 20자 이내로 입력해주세요.").typeError("올바른 회사약칭을 입력해주세요."),
  bsnsNum: string().nullable().max(20, "사업자번호는 20자 이내로 입력해주세요.").typeError("올바른 사업자번호를 입력해주세요."),
  coNum: string().nullable().max(20, "법인번호는 20자 이내로 입력해주세요.").typeError("올바른 법인번호를 입력해주세요."),
  bsType: string().nullable().max(20, "업태는 20자 이내로 입력해주세요.").typeError("올바른 업태를 입력해주세요."),
  bsStock: string().nullable().max(20, "업종은 20자 이내로 입력해주세요.").typeError("올바른 업종을 입력해주세요."),
  pageUrl: string().nullable().max(50, "홈페이지 주소는 50자 이내로 입력해주세요.").typeError("올바른 홈페이지 주소를 입력해주세요."),
  coDomain: string().nullable().max(50, "도메인은 50자 이내로 입력해주세요.").typeError("올바른 도메인을 입력해주세요."),
  fax: string().nullable().max(20, "팩스는 20자 이내로 입력해주세요.").typeError("올바른 팩스를 입력해주세요."),
  stnd: string().nullable().max(20, "행정표준코드는 20자 이내로 입력해주세요.").typeError("올바른 행정표준코드를 입력해주세요."),
  addrDetail: string()
    .nullable()
    .max(30, "상세주소는 30자 이내로 입력해주세요.")
    .typeError("올바른 상세주소를 입력해주세요.")
    .when("postNum", {
      is: undefined,
      then: (schema) => schema.required("우편번호를 선택해주세요."),
      otherwise: (schema) => schema.nullable(),
    }),
});

export const depSchema = object().shape({
  dpCd: string().nullable(),
  upperCd: string().required("상위부서를 선택해주세요."),
  typeCd: string().required("부서유형을 선택해주세요."),
  dpNm: string().required("부서명을 입력해주세요.").max(20, "부서명은 20자 이내로 입력해주세요."),
  recYn: string().default("true").required("대내외 수신여부를 선택해주세요."),
  useYn: string().default("true").required("사용여부를 선택해주세요."),
  sort: number()
    .test('len', '정렬값은 10자리 이내로 입력해주세요.', sort => sort && sort.toString().length <= 10)
    .required("정렬값을 입력해주세요.")
    .positive("정렬값은 0 이상의 숫자를 입력해주세요.")
    .typeError('정렬값은 숫자를 입력해주세요.'),
  cdt: date().nullable(),
  mdt: date().nullable(),
  postNum: string()
    .when('addrDetail', {
      is: (addrDetail) => !(addrDetail === '' || addrDetail === undefined || addrDetail === 'undefined'),
      then: (schema) => schema.required('우편번호를 선택해주세요.'),
      otherwise: (schema) => schema.nullable()
    }),
  addrDetail: string()
    .nullable()
    .max(30, "상세주소는 30자 이내로 입력해주세요.")
    .typeError("올바른 상세주소를 입력해주세요."),
  dpAbb: string().nullable().max(10, "부서약칭은 10자 이내로 입력해주세요.").typeError("올바른 부서약칭을 입력해주세요."),
  stnd: string().nullable().max(20, "표준행정코드는 20자 이내로 입력해주세요.").typeError("올바른 표준행정코드를 입력해주세요."),
  reqNm: string().nullable().max(10, "발신인명은 10자 이내로 입력해주세요.").typeError("올바른 발신인명을 입력해주세요."),

});

export const empSchema = object().shape({
  loginPw: string()
    .required("로그인 비밀번호를 입력해주세요.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: "로그인 비밀번호는 8자리 이상, 영문과 숫자로 입력해주세요.",
    })
    .max(30, "로그인 비밀번호는 30자리 이내로 입력해주세요."),
  signPw: string()
    .required("결재 비밀번호를 입력해주세요.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: "결재 비밀번호는 8자리 이상, 영문과 숫자로 입력해주세요.",
    })
    .max(30, "결재 비밀번호는 30자리 이내로 입력해주세요."),
  fileCd: string().required("사진을 등록해주세요.").typeError('올바른 사진을 등록해주세요.'),
  empNm: string().required("사원 이름을 입력해주세요.").max(10, "사원 이름은 20자리 이내로 입력해주세요."),
  mailId: string().required("메일ID를 입력해주세요.")
    .min(4, "메일 ID는 4자리 이상 입력해주세요")
    .max(15, "메일 ID는 15자리 이하 입력해주세요"),
  loginId: string()
    .required("로그인ID를 입력해주세요.")
    .min(4, "로그인 ID는 4자리 이상 입력해주세요")
    .max(15, "로그인 ID는 15자리 이하 입력해주세요")
    .matches(/^[A-Za-z0-9]*$/, "로그인 ID는 영문과 숫자로 입력해주세요."),
  gender: string().required("성별을 선택해주세요."),
  psnMail: string().nullable().email("이메일 형식을 확인해주세요.").max(50, "개인 메일은 50자리 이하 입력해주세요"),
  payMail: string().nullable().email("이메일 형식을 확인해주세요.").max(50, "급여 메일은 50자리 이하 입력해주세요"),
  empTel: string()
    .required("휴대전화를 입력해주세요.")
    .matches(/^010-\d{4}-\d{4}$/, {
      message: "휴대전화는 010-0000-0000 형식으로 입력해주세요.",
    })
    .max(13, "휴대전화는 13자리 이하 입력해주세요"),
  useYn: string().required("계정 사용여부를 선택해주세요."),
  joinDt: date().required("최초입사일을 선택해주세요.")
    .typeError('최초입사일을 선택해주세요.'),
  cdt: date().nullable(),
  mdt: date().nullable(),
  postNum: string()
    .when('addrDetail', {
      is: (addrDetail) => !(addrDetail === '' || addrDetail === undefined || addrDetail === 'undefined'),
      then: (schema) => schema.required('우편번호를 선택해주세요.'),
      otherwise: (schema) => schema.nullable()
    }),
  addrDetail: string()
    .nullable()
    .max(30, "상세주소는 30자 이내로 입력해주세요.")
    .typeError("올바른 상세주소를 입력해주세요."),
});

export const empUpdateSchema = object().shape({
  fileCd: string().required("사진을 등록해주세요.").typeError('올바른 사진을 등록해주세요.'),
  empNm: string().required("사원 이름을 입력해주세요.").max(10, "사원 이름은 20자리 이내로 입력해주세요."),
  mailId: string().required("메일ID를 입력해주세요.")
    .min(4, "메일 ID는 4자리 이상 입력해주세요")
    .max(15, "메일 ID는 15자리 이하 입력해주세요"),
  loginId: string()
    .required("로그인ID를 입력해주세요.")
    .min(4, "로그인 ID는 4자리 이상 입력해주세요")
    .max(15, "로그인 ID는 15자리 이하 입력해주세요")
    .matches(/^[A-Za-z0-9]*$/, "로그인 ID는 영문과 숫자로 입력해주세요."),
  gender: string().required("성별을 선택해주세요."),
  psnMail: string().nullable().email("이메일 형식을 확인해주세요.").max(50, "개인 메일은 50자리 이하 입력해주세요"),
  payMail: string().nullable().email("이메일 형식을 확인해주세요.").max(50, "급여 메일은 50자리 이하 입력해주세요"),
  empTel: string()
    .required("휴대전화를 입력해주세요.")
    .matches(/^010-\d{4}-\d{4}$/, {
      message: "휴대전화는 010-0000-0000 형식으로 입력해주세요.",
    })
    .max(13, "휴대전화는 13자리 이하 입력해주세요"),
  useYn: string().required("계정 사용여부를 선택해주세요."),
  joinDt: date().required("최초입사일을 선택해주세요.")
    .typeError('최초입사일을 선택해주세요.'),
  cdt: date().nullable(),
  mdt: date().nullable(),
  postNum: string()
    .when('addrDetail', {
      is: (addrDetail) => !(addrDetail === '' || addrDetail === undefined || addrDetail === 'undefined'),
      then: (schema) => schema.required('우편번호를 선택해주세요.'),
      otherwise: (schema) => schema.nullable()
    }),
  addrDetail: string()
    .nullable()
    .max(30, "상세주소는 30자 이내로 입력해주세요.")
    .typeError("올바른 상세주소를 입력해주세요."),
});

export const depGrpSchema = object().shape({
  dpGrpCd: string().nullable(),
  coCd: string().required("회사를 선택해주세요."),
  dpCd: string().required("부서를 선택해주세요."),
  dpGrpNum: string().required("사번을 입력해주세요.").max(20, "사번은 20자리 이내로 입력해주세요."),
  telNum: string().nullable().max(13, "전화번호는 13자리 이내로 입력해주세요."),
  coType: string().required("회사구분을 선택해주세요."),
  dpType: string().required("부서구분을 선택해주세요."),
  workTypeCd: string().required("재직구분을 선택해주세요."),
  empTypeCd: string().required("고용구분을 선택해주세요."),
  joinDt: date().required("입사일을 선택해주세요.")
    .typeError('입사일을 선택해주세요.'),
  jobDetail: string().nullable().max(20, "상세업무는 20자리 이내로 입력해주세요."),
  fax: string().nullable().max(20, "팩스는 20자리 이내로 입력해주세요.")
});

export const menuSchema = object().shape({
  upperCd: string().when("depth", {
    is: 1 > "depth",
    then: (schema) => schema.required("상위메뉴를 선택하세요"),
    otherwise: (schema) => schema.nullable(),
  }),
  fileCd: string().when("upperCd", {
    is: "",
    then: (schema) => schema.required("아이콘을 선택해주세요."),
    otherwise: (schema) => schema.nullable(),
  }),
  menuNm: string().required("메뉴명을 입력해주세요.").max(20, "메뉴명은 20자 이내로 입력해주세요."),
  useYn: string().required("사용여부를 선택해주세요."),
  sort: number()
    .test('len', '정렬값은 10자리 이내로 입력해주세요.', sort => sort && sort.toString().length <= 10)
    .required("정렬값을 입력해주세요.")
    .positive("정렬값은 0 이상의 숫자를 입력해주세요.")
    .typeError('정렬값은 숫자를 입력해주세요.'),
});

export const roleGrpSchema = object().shape({
  grpNm: string().required("그룹명을 입력해주세요.").max(20, "그룹명은 20자 이내로 입력해주세요."),
  useYn: string().required("사용여부를 선택해주세요."),
  coCd: string().required("회사를 선택해주세요."),
});
