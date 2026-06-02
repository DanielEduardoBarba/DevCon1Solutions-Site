import SpinnerSVG from "../components/componentassets/SpinnerSVG"
import { useState } from "react"
import { server } from "../server"

const API_KEY = import.meta.env.VITE_API_KEY

export default function Contact() {
  const [servRes, setServRes] = useState("")
  const [error, setError] = useState("")
  const [isSent, setIsSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', comment: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleContact = (e) => {
    e.preventDefault()

    let notify = ""
    if (!form.name) notify += " name"
    if (!form.email) notify += " email"
    if (!form.phone) notify += " phone"
    if (!form.comment) notify += " comment"
    if (notify) {
      setError("Missing:" + notify)
      return
    }
    setError("")

    if (isSent) return
    setIsSent(true)

    const pkg = { ...form, key: API_KEY }

    fetch(`${server()}/devcon/contact/form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pkg),
    })
      .then((incoming) => {
        if (incoming.status === 200) setServRes("Message sent successfully!")
        else {
          setServRes("Error occurred!")
          return
        }
        return incoming.json()
      })
      .then((response) => {
        console.log("Server responded: ", response)
        setIsSent(false)
      })
      .catch(console.error)
  }

  return (
    <div className="min-h-screen w-full pt-[80px] pb-20 px-4 sm:px-6 flex items-start justify-center">
      <div className="w-full max-w-lg fade-in-up">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">
            Reach Out
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 gradient-text">
            Get In Touch
          </h1>
        </div>

        <form onSubmit={handleContact} className="glass-card p-6 md:p-10">
          {error && (
            <div className="mb-6 text-sm text-center text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              {error}
            </div>
          )}

          {!servRes && (
            <div className="mb-8 flex flex-col items-center">
              <p className="text-white/60 text-center">
                Text/Call:{" "}
                <a href="tel:+19545806829" className="text-white/90 hover:text-white transition-colors font-medium">
                  (954) 580-6829
                </a>
              </p>
              <a
                href="tel:+19545806829"
                className="cta-button mt-4 text-sm !py-2.5 !px-6"
              >
                Call Now!
              </a>
              <div className="flex items-center w-full my-6 gap-3">
                <span className="flex-1 h-px bg-white/10" />
                <span className="text-white/40 text-xs uppercase tracking-widest">or leave us a message</span>
                <span className="flex-1 h-px bg-white/10" />
              </div>
            </div>
          )}

          {!servRes ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
              />
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder="Your message..."
                rows={4}
                className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none"
              />
              {!isSent ? (
                <button type="submit" className="cta-button w-full">
                  Send Message
                </button>
              ) : (
                <div className="w-full flex justify-center py-4">
                  <SpinnerSVG w={40} h={40} color="white" />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-3 py-4">
              <p className="text-2xl font-bold text-green-400">{servRes}</p>
              <p className="text-white/60">We'll get back to you shortly!</p>
              <div className="pt-4">
                <p className="text-white/40 text-sm">or reach us directly at</p>
                <p className="text-white font-medium mt-1">daniel@devcon1solutions.com</p>
                <p className="text-white font-medium mt-1">
                  <a href="tel:+19545806829" className="hover:text-red-300 transition-colors">
                    (954) 580-6829
                  </a>
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
