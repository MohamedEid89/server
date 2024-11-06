class ApiFeatures {
    constructor(mongooseQuery, queryStr) {
        this.mongooseQuery = mongooseQuery;
        this.queryStr = queryStr;
    }

    filter() {
        const queryStringObj = { ...this.queryStr };
        const excludesFields = ['page', 'sort', 'limit', 'fields'];
        excludesFields.forEach((field) => delete queryStringObj[field]);
        let queryStr = JSON.stringify(queryStringObj); // replace to string 
        // replace to string can add '$' to gte/gt/lt
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            // price, - sold => [ price, -sold ] => [ price -sold ]
            const sortBy = this.queryStr.sort.split(',').join(' ');
            // console.log(sortBy);
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryStr.fields) {
            // products?fields=price,sold,ratingsAverage,colors
            const fields = this.queryStr.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);

        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }

    search(modelName) {
        if (this.queryStr.keyword) {
            const query = {};
            if (modelName === 'Product') {
                query.$or = [
                    { title: { $regex: this.queryStr.keyword, $options: 'i' } },
                    { description: { $regex: this.queryStr.keyword, $options: 'i' } },
                ];
            }
            else {
                query.$or = [
                    { name: { $regex: this.queryStr.keyword, $options: 'i' } },
                ];
            }
            this.mongooseQuery = this.mongooseQuery.find(query);
            // this.mongooseQuery = Product.find(query);

        }
        return this;
    }

    paginate(countDocuments) {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 10;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;

        // Pagination result
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.totalDocs = countDocuments / limit;
        // Next page   
        if (endIndex < countDocuments) {
            pagination.nextPage = page + 1;
        }
        if (skip > 0) {
            pagination.prevPage = page - 1;
        }

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationDocs = pagination;
        return this;
    }



}

module.exports = ApiFeatures;