const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
// const ApiFeatures = require("../utils/apiFeatures");


// Delete a service
exports.deleteOne = (Model) => expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
        return next(new ApiError(`No ${Model.modelName} found with the id of ${id}`, 404));
    }
    res.status(200).json({ success: true, data: document });
});


// Update a service
exports.updateOne = (Model) => expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!document) {
        return next(new ApiError(`No ${Model.modelName} found with the id of ${id}`, 404));
    }
    res.status(200).json({ success: true, data: document });
});