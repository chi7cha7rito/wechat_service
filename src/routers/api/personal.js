/**
 * desc:个人中心相关的api 定义
 */

import express from 'express'
import logger from '../../utils/logger';

let router = express.Router()

/**
 * 用户注册
 */
router.post("/add",async (req,res,next)=>{
    try{
        let name=req.body.name;
        let phoneNo=req.body.phoneNo;
        let idCardNo=req.body.idCardNo;
        let wechatOpenId=req.session.user.openid;
        let nickName=req.session.user.nickname;
        let headImgUrl=req.session.user.headimgurl;

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
        logger.error(`api_account_add_error=>${JSON.stringify(e)}`);
    }
})

module.exports = router