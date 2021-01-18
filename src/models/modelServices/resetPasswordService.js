const ResetPassword = require('../resetPassword');

module.exports.findOne = async (admin_id) => {
    resetPassword = await ResetPassword.findOne({ admin_id , expries: { $gt: Date.now() } });
    return resetPassword;
}

module.exports.deleteOne = async (admin_id) => {
    await ResetPassword.deleteOne({admin_id});
}

module.exports.store = async (hash, id) => {
    const resetPassword = new ResetPassword({
        token: hash,
        expries: Date.now() + 900000, // 15 minutes
        admin_id: id,
    });
    await resetPassword.save();
}

module.exports.delete = async (hash) => {
    await ResetPassword.deleteOne({ token: hash });
}