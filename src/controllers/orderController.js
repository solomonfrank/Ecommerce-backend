import orderModel from '../model/orderModel';

const getOrders = async (req, res) => {
  let queryStr = { ...req.query };

  // simple filtering
  const excludeField = ['page', 'sort', 'limit', 'field'];

  excludeField.forEach(item => {
    delete queryStr[item];
  });
  queryStr = JSON.stringify(queryStr);
  queryStr = JSON.parse(
    queryStr.replace(/\b(gte|lte|gt|lt)\b/g, match => `$${match}`)
  );
  console.log(queryStr);
  let query = orderModel.find(queryStr);

  // sorting
  if (req.query.sort) {
    const sorted = req.query.sort.split(',').join(' ');
    query.sort(sorted);
  } else {
    query.sort('createdAt');
  }

  // limiting

  if (req.query.field) {
    const fields = req.query.field.split(',').join(' ');
    query.select(fields);
  } else {
    query.select('-__v'); //exclude __v field
  }

  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numoOrder = await orderModel.countsDocument();

    if (skip >= numoOrder) throw new Error('page does not exist');
  }

  // const order = await query;
  console.log(query);
};

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const createOrder = catchAsync(async (req, res, next) => {
  await orderModel.create(req.body);
});

export default getOrders;
