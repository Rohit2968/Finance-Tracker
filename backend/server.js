app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            }
        );

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});