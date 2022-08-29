export default function login(req, res) {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;
      console.log(email, password);
      return res.json({ email, password });

    default:
      return res.status(403);
  }
}
