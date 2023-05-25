/**
 * AdvancedResults takes in the model from route and
 * parses all queries to mongoDB format as well as enables pagination
 */
const AdvancedResults = (Model) => async (req, res, next) => {
    /**
     * query is current logged as "{ totalMarks: { gt: '60' } }",
     * however mongoDB accepts "{ totalMarks: { $gt: '60' } }" as a query
     */
    let query;

    // create a copy of request query to exclude certain fields
    const reqQuery = {...req.query};

    // fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // loop over remove fields and delete them from reqQuery
    removeFields.map(param => delete reqQuery[param]);

    // stringify the query and replace the gt/gte/le/lte/in with $gt/$gte/$lt/$lte/$in
    let queryStr =
    JSON
        .stringify(reqQuery)
        .replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // parse the query string and send to database with find method
    query = Model.find(JSON.parse(queryStr));

    // select fields
    if(req.query.select) {
        /**
         * replace the query 'id,name,email' by 'id name email'
         * which is accepted by mongoDB select query
         */
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // sort fields
    if(req.query.sort) {
        /**
         * replace the query 'id,name,email' by 'id name email'
         * which is accepted by mongoDB sort query
         */
        const fields = req.query.sort.split(',').join(' ');
        query = query.sort(fields);
    } else {
        // default sort by date of creation in descending order
        // query = query.sort('-createdAt');
        query = query.sort('');
    }

    // pagination
    /**
     * parse the page number and limit from query as integer base 10
     * default page without query is page 1 and
     * default limit without query is 5 entries per page
     * skip specifies the number of documents to skip (where to start/end)
     * total specifies the total number of documents in collection
     */
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Model.countDocuments();
    query = query.skip(startIndex).limit(limit);

    // pagination result
    const pagination = {};

    // next page
    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
        }
    }

    // current page
    pagination.curr = {
        page: page,
    }

    // next page
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
        }
    }

    // execute query
    const results = await query;

    res.AdvancedResults = {
        success: true,
        count: results.length,
        total,
        limit,
        pagination,
        data: results
    };

    // allows middleware to proceed to the next process in server file
    next();
}

// export AdvancedResults
module.exports = AdvancedResults;