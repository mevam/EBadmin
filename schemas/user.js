/**
 * Created by Administrator on 2016/11/13.
 */

var mongoose =require('mongoose');

//定义模式
var UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        role: String,
        meta:{
            createAt:{
                type: Date,
                default: Date.now()
            },
            updateAt:{
                type: Date,
                default: Date.now()
            }
        }
    }
);

UserSchema.pre('save',function(next) {
    if(this.isNew){
        //新加数据
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else{
        //已有数据
        this.meta.updateAt = Date.now()
    }
    next()
});

//静态方法
UserSchema.statics = {
    fetch: function(cb){
        return this
            .find()
            .sort({'meta.updateAt':1})
            .exec(cb)
    },
    findByName: function(name, cb){
        return this
            .findOne({username: name})
            .exec(cb)
    },
    deleteByName: function(name, cb){
        return this
            .delete({username: name})
            .exec(cb)
    },
    insertUser: function (user, cb) {
        return this
            .insert(user)
            .exec(cb)
    }
};

//输出模式
module.exports = UserSchema;