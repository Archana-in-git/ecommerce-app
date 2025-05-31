const Newsletter = require("../models/Newsletter"); // create this model

const signupNewsletter = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const newSubscriber = new Newsletter({ name, email });
    await newSubscriber.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
