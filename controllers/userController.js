import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Login
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { name, email, phone, username, image } = req.body

  const userExists = await User.findOne({ email })

  if (!userExists) {
    const user = await User.create({
      name,
      email,
      phone,
      username,
      image,
    })

    if (user) {
      res.status(201).json(user)
    }
  }
  if (userExists) {
    res.status(200).json(userExists)
  } else {
    res.status(400)
    throw new Error('Error Occured')
  }
})

export { authUser }