require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Schema, Types } = mongoose;
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pragrati_mitar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'situationalComebacks@gmail.com',
    pass: 'awek kpam rvma jafp',
  },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  type: { type: String, required: true, enum: ['customer', 'service-provider'] },
  location: { type: String, required: true },
  state: { type: String, required: true },
  serviceType: { type: String },
  experience: { type: Number },
  hourlyRate: { type: Number },
  description: { type: String },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

const BookingSchema = new Schema({
  providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  created_at: { type: Date, default: Date.now }
});

const ReviewSchema = new Schema({
  providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Booking = mongoose.model('Booking', BookingSchema);
const Review = mongoose.model('Review', ReviewSchema);

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, mobile, type, location, state, serviceType, experience, hourlyRate, description } = req.body;

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      mobile,
      type,
      location,
      state
    };
    
    if (type === 'service-provider') {
      userData.serviceType = serviceType;
      userData.experience = experience;
      userData.hourlyRate = hourlyRate;
      userData.description = description;
    }
    
    const user = new User(userData);
    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      user: userResponse
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, type } = req.body;

    const user = await User.findOne({ email, type });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/providers', async (req, res) => {
  try {
    const { type } = req.query;
    
    if (!type) {
      return res.status(400).json({ message: 'Service type is required' });
    }

    const providers = await User.find({ 
      type: "service-provider", 
      serviceType: type 
    }).select('-password');
    
    res.json(providers);
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/providers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const provider = await User.findOne({ 
      _id: id, 
      type: "service-provider" 
    }).select('-password');
    
    if (!provider) {
      return res.status(404).json({ message: 'Service provider not found' });
    }
    
    const reviews = await Review.aggregate([
      { $match: { providerId: new Types.ObjectId(id) } },
      { $lookup: {
          from: 'users',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer'
        }
      },
      { $unwind: '$customer' },
      { $project: {
          _id: 1,
          rating: 1,
          comment: 1,
          created_at: 1,
          customerName: '$customer.name'
        }
      }
    ]);
    
    const providerObj = provider.toObject();
    providerObj.reviews = reviews;
    
    res.json(providerObj);
  } catch (error) {
    console.error('Get provider error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { providerId, customerId, message, date } = req.body;
    
    if (!providerId || !customerId || !date) {
      return res.status(400).json({ message: 'Provider ID, customer ID, and date are required' });
    }

    const booking = new Booking({
      providerId,
      customerId,
      message,
      date
    });
    
    await booking.save();
    
    const provider = await User.findById(providerId);
    const customer = await User.findById(customerId);
    
    if (provider && customer && process.env.EMAIL_USER) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: provider.email,
        subject: 'New Booking Request - Pragrati Mitar',
        text: `Dear ${provider.name},

You have received a new booking request from ${customer.name} for ${date}.

Message: ${message || 'No message provided'}

Please log in to your account to accept or reject this booking.

Regards,
Pragrati Mitar Team`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email sending error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/bookings/customer/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    const bookings = await Booking.aggregate([
      { $match: { customerId: new Types.ObjectId(customerId) } },
      { $lookup: {
          from: 'users',
          localField: 'providerId',
          foreignField: '_id',
          as: 'provider'
        }
      },
      { $unwind: '$provider' },
      { $project: {
          _id: 1,
          providerId: 1,
          customerId: 1,
          message: 1,
          date: 1,
          status: 1,
          created_at: 1,
          providerName: '$provider.name',
          serviceType: '$provider.serviceType',
          hourlyRate: '$provider.hourlyRate'
        }
      },
      { $sort: { date: -1 } }
    ]);
    
    res.json(bookings);
  } catch (error) {
    console.error('Get customer bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/bookings/provider/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;
    const { status } = req.query;
    
    const matchQuery = { providerId: new Types.ObjectId(providerId) };
    
    if (status && ['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
      matchQuery.status = status;
    }
    
    const bookings = await Booking.aggregate([
      { $match: matchQuery },
      { $lookup: {
          from: 'users',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer'
        }
      },
      { $unwind: '$customer' },
      { $project: {
          _id: 1,
          providerId: 1,
          customerId: 1,
          message: 1,
          date: 1,
          status: 1,
          created_at: 1,
          customerName: '$customer.name',
          customerMobile: '$customer.mobile',
          customerEmail: '$customer.email'
        }
      },
      { $sort: { date: -1 } }
    ]);
    
    res.json(bookings);
  } catch (error) {
    console.error('Get provider bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/bookings/:bookingId/status', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, providerId } = req.body;
    
    if (!['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // if (booking.providerId.toString() !== providerId) {
    //   return res.status(403).json({ message: 'Not authorized to update this booking' });
    // }
    
    booking.status = status;
    await booking.save();
    
    if (status === 'accepted' && process.env.EMAIL_USER) {
      const provider = await User.findById(booking.providerId);
      const customer = await User.findById(booking.customerId);
      
      if (provider && customer) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: customer.email,
          subject: 'Booking accepted - Pragrati Mitar',
          text: `Dear ${customer.name},

Your booking with ${provider.name} for ${booking.date} has been accepted.

Service provider will contact you soon for further details.

Regards,
Pragrati Mitar Team`
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Email sending error:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
    }
    
    res.json({ message: `Booking status updated to ${status}` });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { providerId, customerId, rating, comment } = req.body;
    
    if (!providerId || !customerId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Provider ID, customer ID, and valid rating (1-5) are required' });
    }
    
    const completedBooking = await Booking.findOne({
      providerId,
      customerId,
      status: 'completed'
    });
    
    if (!completedBooking) {
      return res.status(400).json({ message: 'You can only review providers after completing a booking with them' });
    }
    
    const existingReview = await Review.findOne({
      providerId,
      customerId
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this provider' });
    }
    
    const review = new Review({
      providerId,
      customerId,
      rating,
      comment
    });
    
    await review.save();
    
    const reviews = await Review.find({ providerId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = totalRating / reviews.length;
    
    await User.findByIdAndUpdate(providerId, {
      rating: avgRating,
      reviewCount: reviews.length
    });
    
    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/reviews/provider/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;
    
    const reviews = await Review.aggregate([
      { $match: { providerId: new Types.ObjectId(providerId) } },
      { $lookup: {
          from: 'users',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer'
        }
      },
      { $unwind: '$customer' },
      { $project: {
          _id: 1,
          providerId: 1,
          customerId: 1,
          rating: 1,
          comment: 1,
          created_at: 1,
          customerName: '$customer.name'
        }
      },
      { $sort: { created_at: -1 } }
    ]);
    
    res.json(reviews);
  } catch (error) {
    console.error('Get provider reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Pragrati Mitar API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});