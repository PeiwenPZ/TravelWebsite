class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1) create basic filter for req querry
    const queryObj = { ...this.queryString }; //avoid req body changes
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //2) create less than filter { duration: { gte: '5' }, difficulty: 'easy' }
    //output: {duration: { $gte: 5}} add a $ in front of duration
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //regular expression

    this.query = this.query.find(JSON.parse(queryStr)); //convert String to JSON object

    return this;
  }

  sort() {
    //3) sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      //default mode
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    //4) field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //everything except __v
    }
    return this;
  }

  paginate() {
    //5) Pagination
    const page = this.queryString.page * 1 || 1; // || means by default
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;