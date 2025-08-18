import { FiMail, FiMapPin,FiPhone, FiSend } from "react-icons/fi";

function ContactUs() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                        Contact Us
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Have questions or need support? We'd love to hear from
                        you. Send us a message and we'll respond as soon as
                        possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="glass-card card">
                            <div className="card-header">
                                <h3 className="card-title text-lg font-semibold">
                                    Send us a Message
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Fill out the form below and we'll get back
                                    to you within 24 hours.
                                </p>
                            </div>

                            <div className="card-body">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="">
                                                Full Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                placeholder="Enter your full name"
                                                required
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                required
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us how we can help you..."
                                            className="textarea textarea-bordered w-full min-h-[120px]"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn w-full"
                                    >
                                        <FiSend className="mr-2 h-4 w-4 inline-block" />
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="glass-card card">
                            <div className="card-header">
                                <h3 className="card-title text-lg font-semibold">
                                    Get in Touch
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Reach out to us through any of these
                                    channels.
                                </p>
                            </div>
                            <div className="card-body space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <FiMail className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-sm text-muted-foreground">
                                            support@codefusion.com
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <FiPhone className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <p className="text-sm text-muted-foreground">
                                            +91 9123456789
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <FiMapPin className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Address</p>
                                        <p className="text-sm text-muted-foreground">
                                            123 ABC Street
                                            <br />
                                            XYZ City, State 12345
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card card">
                            <div className="card-body p-6">
                                <h3 className="font-semibold mb-2">
                                    Response Time
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    We typically respond to all inquiries within
                                    24 hours during business days.
                                </p>
                                <div className="text-xs text-muted-foreground">
                                    <p>Business Hours:</p>
                                    <p>
                                        Monday - Friday: 9:00 AM - 6:00 PM PST
                                    </p>
                                    <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
