
import { number, object, string, date } from "yup";

export const corpSchema = object().shape({
    coCd: string().nullable(),
    useYn: string().required("사용여부를 체크해주세요."),
    coNm: string().required("회사명을 입력해주세요."),
    coAbb: string().nullable(),
    bsStock: string().nullable(),
    stnd: string().nullable(),
    bsnsNum: string().nullable(),
    bsCd: string().nullable(),
    coNum: string().nullable(),
    ceoNm: string().required("대표자명을 입력해주세요."),
    postNum: string().required("우편번호를 선택해주세요."),
    addr: string().required("주소를 선택해주세요."),
    addrDetail: string().nullable(),
    pageUrl: string().nullable(),
    coDomain: string().nullable(),
    sort: number().required("정렬값을 입력해주세요.").positive().integer(),
    chCd: string().nullable(),
    ccNm: string().nullable(),
    cdt: date().nullable(),
    mdt: date().nullable(),
    chCd: string().nullable(),
    estDt: date().required("설립일을 입력해주세요."),
    opDt: date().required("개업일을 입력해주세요."),
    clsDt: date().nullable(),
});


export const depSchema = object().shape({
    dpCd: string().nullable(),
    coCd: string(),
    upperCd: string().required("상위부서를 선택해주세요."),
    typeCd: string().required("부서유형을 선택해주세요."),
    dpNm: string().required("부서명을 입력해주세요."),
    postNum: string().nullable(),
    addr: string().nullable(),
    addrDetail: string().nullable(),
    dpAbb: string().nullable(),
    recYn: string().required("대내외 수신여부를 선택해주세요."),
    stnd: string().nullable(),
    reqNm: string().nullable(),
    useYn: string().required("사용여부를 선택해주세요."),
    organYn: string().required("조직도 표시여부를 선택해주세요."),
    dpPath: string().nullable(),
    sort: number().required("정렬값을 입력해주세요.").positive().integer(),
    depth: number().nullable(),
    cdt: date().nullable(),
    mdt: date().nullable(),
});

export const empSchema = object().shape({
    empCd: string().required("상위부서를 선택해주세요."),
    fileCd: string(),
    empNm: string().required("사원 이름을 입력해주세요."),
    mailId: string().required("메일ID를 입력해주세요."),
    loginId: string()
        .required("로그인ID를 입력해주세요.")
        .min(4, "로그인 ID는 4자리 이상 입력해주세요")
        .max(15, "로그인 ID는 15자리 이하 입력해주세요")
        .matches(/^[A-Za-z0-9]*$/, "로그인 ID는 영문과 숫자로 입력해주세요."),
    loginPw: string()
        .required("로그인 비밀번호를 입력해주세요.")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: "로그인 비밀번호는 8자리 이상, 영문과 숫자로 입력해주세요." }),
    signPw: string()
        .required("결재 비밀번호를 입력해주세요.")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: "결재 비밀번호는 8자리 이상, 영문과 숫자로 입력해주세요." }),
    gender: string().required("성별을 선택해주세요."),
    psnMail: string()
        .nullable().email("이메일 형식을 확인해주세요."),
     //   .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, { message: "이메일 형식을 확인해주세요." }),
    payMail: string()
        .nullable()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, { message: "이메일 형식을 확인해주세요." }),
    empTel: string()
        .required("휴대전화를 입력해주세요.")
        .matches(/^010-\d{4}-\d{4}$/, { message: "휴대전화는 010-0000-0000 형식으로 입력해주세요." }),
    postNum: string().nullable(),
    addr: string().nullable(),
    addrDetail: string().nullable(),
    useYn: string().required("계정 사용여부를 선택해주세요."),
    joinDt: date().required("최초입사일을 선택해주세요."),
    reDt: date().nullable(),
    cdt: date().nullable(),
    mdt: date().nullable(),
});


export const depGrpSchema = object().shape({
    dpGrpCd: string().nullable(),
    coCd: string().required("회사를 선택해주세요."),
    dpCd: string().required("부서를 선택해주세요."),
    dpGrpNum: string().required("사번을 입력해주세요."),
    telNum: string().nullable(),
    coType: string().required("회사구분을 선택해주세요."),
    dpType: string().required("부서구분을 선택해주세요."),
    rankCd: string().nullable(),
    pstnCd:string().nullable(),
    workTypeCd: string().required("재직구분을 선택해주세요."),
    empTypeCd: string().required("고용구분을 선택해주세요."),
    jobCd: string().nullable(),
    jobDetail: string().nullable(),
    joinDt: date().required("입사일을 선택해주세요."),
    reDt: date().nullable(),
    fax: string().nullable(),
    postNum: string().nullable(),
    addr: string().nullable(),
    addrDetail: string().nullable(),
});


export const menuSchema = object().shape({
    menuCd: string().nullable(),
    typeCd: string().nullable(),
    upperCd: string().required("상위메뉴를 선택하세요"),
    fileCd: string().when('upperCd', {
        is: '',
        then: (schema) => schema.required("아이콘을 선택해주세요."),
        otherwise: (schema) => schema.nullable(),
    }),
    menuNm: string().required("메뉴명을 입력해주세요."),
    useYn: string().required("사용여부를 선택해주세요."),
    sort: string().required("정렬값을 입력해주세요."),
});


export const roleGrpSchema = object().shape({
    rgCd: string().nullable(),
    grpNm: string().required("그룹명을 입력해주세요."),
    useYn: string().required("사용여부를 선택해주세요."),
    coCd: string().required("회사를 선택해주세요."),

});
