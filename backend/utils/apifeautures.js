class APIFeautures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    // the queryStr is a string that contains the query which equals apple
    //  in this case and we are using ternary operator
    //  if its true we are going to provide the query= apple in this case or else an empty object
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // case insensitive K is for case sensitive
          },
        }
      : {};

    console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    console.log(queryCopy);

    // removing fields from query since it is not in the model
    const removeFields = ["keyword", "page", "limit"];
    // removeFields is an array
    removeFields.forEach((el) => delete queryCopy[el]);
    console.log(queryCopy);

    // Advanced filters eg price between 1000 and 2000 or rating greater than 5
    // fierst turning json to string and later parse it to json when returning
    let queryStr = JSON.stringify(queryCopy);
    // we are doing this because by default mongoose uses $ dollar sign before every comparison
    // eg gt lt lte that we are are replcing the dollar sign
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    console.log(queryStr);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeautures;
