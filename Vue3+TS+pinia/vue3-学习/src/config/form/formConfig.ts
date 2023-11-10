export default {
    labelWidth: "80px",
    labelPosition:'left',
    style:{
        header:{
            background:'red',
            color:'#fff',
            padding:'10px 0',
            textAlign:'center',
        },
        bottom:{
            textAlign:'center',
            padding:'10px 0',
        }
    },
    inline:true,
    rules:{
        name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ]
    },
    formItems:[
        {
            field: 'name',
            type:'input',
            label: '用户名',
            placeholder: '请输入用户名',
        },
        {
            field: 'userState',
            type:'select',
            label: '下拉选择',
            placeholder: '请选择',
            options:[
                {
                    label:'选项一',
                    value:'1'
                },
                {
                    label:'选项二',
                    value:'2'
                },
                {
                    label:'选项三',
                    value:'3'
                },
            ]
        }
    ]
}