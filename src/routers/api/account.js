/**
 * desc:账户相关的api 定义
 */

import express from 'express'
import logger from '../../utils/logger';
import moment from 'moment';

let router = express.Router()

/**
 * 用户注册
 */
router.post("/add",async (req,res,next)=>{
    try{
        let name=req.body.name;
        let phoneNo=req.body.phoneNo;
        let idCardNo=req.body.idCardNo;
        let smsCode=req.body.smsCode;
        let wechatOpenId=req.session.wechatUser.openid;
        let nickName=req.session.wechatUser.nickname;
        let headImgUrl=req.session.wechatUser.headimgurl;
        let dateNow=moment().unix();

        if(dateNow-req.session.smsCodeGenDate>1750){
            return res.json({
                "status":"0",
                "message":"短信验证码失效",
                "data":null
            })
        }


        if(req.session.smsCode!=smsCode){
            return res.json({
                "status":"0",
                "message":"短信验证码错误",
                "data":null
            })
        }

        let resp=await requestHelper.post({
            "moduleName":"hulk_service",
            "controller":"member",
            "action":"create",
            "data":{
                name,
                phoneNo,
                idCardNo,
                wechatOpenId,
                nickName,
                headImgUrl
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_account_add_error=>${e}`);
    }
})


/**
 * 签到
 */
router.post("/signIn",async (req,res,next)=>{
    try{
        let memberId=req.session.user.member.id
        let comment=req.body.comment;
        let resp=await requestHelper.post({
            "moduleName":"hulk_service",
            "controller":"signIn",
            "action":"create",
            "data":{
               memberId,
               comment
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_account_signIn_error=>${e}`)
    }
})

module.exports = router