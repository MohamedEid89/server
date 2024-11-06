const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");


// Create a Service
exports.createOne = (Model) => expressAsyncHandler(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({ success: true, data: document });
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

// Delete a service
exports.deleteOne = (Model) => expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
        return next(new ApiError(`No ${Model.modelName} found with the id of ${id}`, 404));
    }
    res.status(200).json({ success: true, data: document });
});


// Get all Services
exports.getAll = (Model, modelName = '') => expressAsyncHandler(async (req, res) => {

    const documentsCount = await Model.countDocuments()
    const apiFeatures = new ApiFeatures(Model.find(), req.query).paginate(documentsCount).filter().search(modelName).limitFields().sort();
    // Execute query
    const { mongooseQuery, paginationDocs } = apiFeatures;
    const documents = await mongooseQuery;

    res.status(200).json({ result: documents.length, paginationDocs, data: documents });
});

// get a single service document
exports.getOne = (Model) => expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
        return next(new ApiError(`No ${Model.modelName} found with the id of ${id}`, 404));
    }
    res.status(200).json({ data: document });
});