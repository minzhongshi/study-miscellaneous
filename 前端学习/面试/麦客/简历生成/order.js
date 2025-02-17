import data from "./data.json" assert {type: "json"};

const json = data
const order = [
    ['姓名：'+json.personalDetails.name,'年龄：'+json.personalDetails.age,'性别：'+json.personalDetails.sex],
    ['电话：'+json.personalDetails.phone,'地址：'+json.personalDetails.address,'邮箱：'+json.personalDetails.email],
    '教育背景',
    ['时间：'+json.education.time,'学校名称：'+json.education.school],
    ['所学专业：'+json.education.major,'学历学位：'+json.education.degree],
    '专业技能',
    ...json.professionalSkill,
    '工作经历',
    [json.workExperience[0].time,json.workExperience[0].company,json.workExperience[0].position],
    '项目简介：',
    json.workExperience[0].intro[0].name,
    '简介：'+json.workExperience[0].intro[0].synopsis,
    '主要职责：'+json.workExperience[0].intro[0].responsibility,
    [json.workExperience[1].time,json.workExperience[1].company,json.workExperience[1].position],
    '项目简介：',
    json.workExperience[1].intro[0].name,
    '简介：'+json.workExperience[1].intro[0].synopsis,
    '主要职责：'+json.workExperience[1].intro[0].responsibility,
    json.workExperience[1].intro[1].name,
    '简介：'+json.workExperience[1].intro[1].synopsis,
    '主要职责：'+json.workExperience[1].intro[1].responsibility,
    '校园经历',
    [json.campusExperience[0].time,json.campusExperience[0].name],
    '项目名称：'+json.campusExperience[0].projectName,
    '担任角色：'+json.campusExperience[0].position,
    '项目描述：'+json.campusExperience[0].intro,
    '责任描述：'+json.campusExperience[0].responsibility,
    '自我评价',
    ...json.selfAssessment,
]
export default order