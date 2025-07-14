import React from 'react';
import { SiteContent, TestimonialReview } from '../types/Site';
import ImageUpload from './ImageUpload';

interface ContentEditorProps {
  content: SiteContent;
  onContentChange: (content: SiteContent) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ content, onContentChange }) => {
  const updateField = (path: string, value: string) => {
    const keys = path.split('.');
    const updatedContent = { ...content };
    let current: any = updatedContent;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    onContentChange(updatedContent);
  };

  const updateTestimonials = (testimonials: { title: string; subtitle: string; reviews: TestimonialReview[] }) => {
    const updatedContent = { ...content, testimonials };
    onContentChange(updatedContent);
  };

  const addTestimonial = () => {
    const newTestimonial: TestimonialReview = {
      rating: 5,
      text: "",
      name: "",
      title: "",
      image: ""
    };

    const currentTestimonials = content.testimonials || {
      title: "What Our Customers Say",
      subtitle: "Hear from people who have transformed their financial situation with our services.",
      reviews: []
    };

    updateTestimonials({
      ...currentTestimonials,
      reviews: [...currentTestimonials.reviews, newTestimonial]
    });
  };

  const updateTestimonial = (index: number, field: keyof TestimonialReview, value: string | number) => {
    if (!content.testimonials) return;

    const updatedReviews = [...content.testimonials.reviews];
    updatedReviews[index] = { ...updatedReviews[index], [field]: value };

    updateTestimonials({
      ...content.testimonials,
      reviews: updatedReviews
    });
  };

  const removeTestimonial = (index: number) => {
    if (!content.testimonials) return;

    const updatedReviews = content.testimonials.reviews.filter((_, i) => i !== index);
    updateTestimonials({
      ...content.testimonials,
      reviews: updatedReviews
    });
  };

  return (
    <div className="content-editor">
      <h2>Edit Content for {content.siteName}</h2>

      {/* Contact Information */}
      <section className="editor-section">
        <h3>Contact Information</h3>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={content.contact.phone}
            onChange={(e) => updateField('contact.phone', e.target.value)}
            placeholder="011-234-5678"
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={content.contact.email}
            onChange={(e) => updateField('contact.email', e.target.value)}
            placeholder="info@example.com"
          />
        </div>
      </section>

      {/* Navigation Menu */}
      <section className="editor-section">
        <h3>Navigation Menu</h3>
        <div className="form-group">
          <label>Home Menu Label:</label>
          <input
            type="text"
            value={content.navigation.home}
            onChange={(e) => updateField('navigation.home', e.target.value)}
            placeholder="Apply Now"
          />
        </div>
        <div className="form-group">
          <label>Second Menu Label:</label>
          <input
            type="text"
            value={content.navigation.qualify}
            onChange={(e) => updateField('navigation.qualify', e.target.value)}
            placeholder="How To Qualify"
          />
        </div>
        <div className="form-group">
          <label>About Menu Label:</label>
          <input
            type="text"
            value={content.navigation.about}
            onChange={(e) => updateField('navigation.about', e.target.value)}
            placeholder="About Us"
          />
        </div>
        <div className="form-group">
          <label>Contact Menu Label:</label>
          <input
            type="text"
            value={content.navigation.contact}
            onChange={(e) => updateField('navigation.contact', e.target.value)}
            placeholder="Contact Us"
          />
        </div>
        <div className="form-group">
          <label>Last Menu Label:</label>
          <input
            type="text"
            value={content.navigation.complain}
            onChange={(e) => updateField('navigation.complain', e.target.value)}
            placeholder="Complain Procedure"
          />
        </div>
      </section>

      {/* Branding Section */}
      <section className="editor-section">
        <h3>Branding</h3>
        <div className="form-group">
          <label>Site Name:</label>
          <input
            type="text"
            value={content.siteName}
            onChange={(e) => updateField('siteName', e.target.value)}
          />
        </div>
        <ImageUpload
          label="Logo"
          value={content.branding.logo}
          onChange={(url) => updateField('branding.logo', url)}
          type="logos"
          placeholder="Enter logo URL or upload a logo file"
        />
        <div className="form-group">
          <label>Primary Color:</label>
          <input
            type="color"
            value={content.branding.primaryColor}
            onChange={(e) => updateField('branding.primaryColor', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Secondary Color:</label>
          <input
            type="color"
            value={content.branding.secondaryColor}
            onChange={(e) => updateField('branding.secondaryColor', e.target.value)}
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="editor-section">
        <h3>Hero Section</h3>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={content.hero.title}
            onChange={(e) => updateField('hero.title', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Subtitle:</label>
          <textarea
            value={content.hero.subtitle}
            onChange={(e) => updateField('hero.subtitle', e.target.value)}
          />
        </div>
        <ImageUpload
          label="Background Image"
          value={content.hero.backgroundImage}
          onChange={(url) => updateField('hero.backgroundImage', url)}
          type="heroes"
          placeholder="Enter background image URL or upload an image"
        />
        <div className="form-group">
          <label>Button Text:</label>
          <input
            type="text"
            value={content.hero.buttonText}
            onChange={(e) => updateField('hero.buttonText', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Button Link:</label>
          <input
            type="text"
            value={content.hero.buttonLink}
            onChange={(e) => updateField('hero.buttonLink', e.target.value)}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="editor-section">
        <h3>How It Works Section</h3>
        <div className="form-group">
          <label>Section Title:</label>
          <input
            type="text"
            value={content.howItWorks?.title || "How It Works"}
            onChange={(e) => updateField('howItWorks.title', e.target.value)}
            placeholder="How It Works"
          />
        </div>

        <h4>Step 1</h4>
        <div className="form-group">
          <label>Step 1 Title:</label>
          <input
            type="text"
            value={content.howItWorks?.step1?.title || "Apply Online"}
            onChange={(e) => updateField('howItWorks.step1.title', e.target.value)}
            placeholder="Apply Online"
          />
        </div>
        <div className="form-group">
          <label>Step 1 Description:</label>
          <textarea
            value={content.howItWorks?.step1?.description || "Complete our simple and secure online application form in minutes."}
            onChange={(e) => updateField('howItWorks.step1.description', e.target.value)}
            placeholder="Describe the first step..."
          />
        </div>

        <h4>Step 2</h4>
        <div className="form-group">
          <label>Step 2 Title:</label>
          <input
            type="text"
            value={content.howItWorks?.step2?.title || "We Review"}
            onChange={(e) => updateField('howItWorks.step2.title', e.target.value)}
            placeholder="We Review"
          />
        </div>
        <div className="form-group">
          <label>Step 2 Description:</label>
          <textarea
            value={content.howItWorks?.step2?.description || "Our team quickly reviews your application and provides a decision."}
            onChange={(e) => updateField('howItWorks.step2.description', e.target.value)}
            placeholder="Describe the second step..."
          />
        </div>

        <h4>Step 3</h4>
        <div className="form-group">
          <label>Step 3 Title:</label>
          <input
            type="text"
            value={content.howItWorks?.step3?.title || "Get Funds"}
            onChange={(e) => updateField('howItWorks.step3.title', e.target.value)}
            placeholder="Get Funds"
          />
        </div>
        <div className="form-group">
          <label>Step 3 Description:</label>
          <textarea
            value={content.howItWorks?.step3?.description || "Once approved, funds are quickly disbursed to your account."}
            onChange={(e) => updateField('howItWorks.step3.description', e.target.value)}
            placeholder="Describe the third step..."
          />
        </div>
      </section>

      {/* How to Qualify Section */}
      <section className="editor-section">
        <h3>How to Qualify Section</h3>
        <div className="form-group">
          <label>Section Title:</label>
          <input
            type="text"
            value={content.qualify?.title || "How to Qualify"}
            onChange={(e) => updateField('qualify.title', e.target.value)}
            placeholder="How to Qualify"
          />
        </div>
        <div className="form-group">
          <label>Section Subtitle:</label>
          <textarea
            value={content.qualify?.subtitle || "In order to qualify, you will need to supply the following documentation."}
            onChange={(e) => updateField('qualify.subtitle', e.target.value)}
            placeholder="Description of what's needed to qualify..."
          />
        </div>
        
        <h4>Requirement 1</h4>
        <div className="form-group">
          <label>Requirement 1 Title:</label>
          <input
            type="text"
            value={content.qualify?.requirement1?.title || "3 Month's bank statements"}
            onChange={(e) => updateField('qualify.requirement1.title', e.target.value)}
            placeholder="3 Month's bank statements"
          />
        </div>
        <ImageUpload
          label="Requirement 1 Icon"
          value={content.qualify?.requirement1?.icon || ""}
          onChange={(url) => updateField('qualify.requirement1.icon', url)}
          type="logos"
          placeholder="Upload icon for first requirement (will be shown as white on red background)"
        />
        
        <h4>Requirement 2</h4>
        <div className="form-group">
          <label>Requirement 2 Title:</label>
          <input
            type="text"
            value={content.qualify?.requirement2?.title || "Photocopy of ID or passport"}
            onChange={(e) => updateField('qualify.requirement2.title', e.target.value)}
            placeholder="Photocopy of ID or passport"
          />
        </div>
        <ImageUpload
          label="Requirement 2 Icon"
          value={content.qualify?.requirement2?.icon || ""}
          onChange={(url) => updateField('qualify.requirement2.icon', url)}
          type="logos"
          placeholder="Upload icon for second requirement (will be shown as white on red background)"
        />
        
        <h4>Requirement 3</h4>
        <div className="form-group">
          <label>Requirement 3 Title:</label>
          <input
            type="text"
            value={content.qualify?.requirement3?.title || "Be at least 21 Years or older"}
            onChange={(e) => updateField('qualify.requirement3.title', e.target.value)}
            placeholder="Be at least 21 Years or older"
          />
        </div>
        <ImageUpload
          label="Requirement 3 Icon"
          value={content.qualify?.requirement3?.icon || ""}
          onChange={(url) => updateField('qualify.requirement3.icon', url)}
          type="logos"
          placeholder="Upload icon for third requirement (will be shown as white on red background)"
        />
        
        <h4>Requirement 4</h4>
        <div className="form-group">
          <label>Requirement 4 Title:</label>
          <input
            type="text"
            value={content.qualify?.requirement4?.title || "Your two latest payslips"}
            onChange={(e) => updateField('qualify.requirement4.title', e.target.value)}
            placeholder="Your two latest payslips"
          />
        </div>
        <ImageUpload
          label="Requirement 4 Icon"
          value={content.qualify?.requirement4?.icon || ""}
          onChange={(url) => updateField('qualify.requirement4.icon', url)}
          type="logos"
          placeholder="Upload icon for fourth requirement (will be shown as white on red background)"
        />
      </section>

      {/* Why Choose Us Section */}
      <section className="editor-section">
        <h3>Why Choose Us Section</h3>
        <div className="form-group">
          <label>Section Title:</label>
          <input
            type="text"
            value={content.whyChooseUs?.title || "Why Choose Us?"}
            onChange={(e) => updateField('whyChooseUs.title', e.target.value)}
            placeholder="Why Choose Us?"
          />
        </div>
        
        <h4>Benefit 1</h4>
        <div className="form-group">
          <label>Benefit 1 Title:</label>
          <input
            type="text"
            value={content.whyChooseUs?.benefit1?.title || "Fast Approval"}
            onChange={(e) => updateField('whyChooseUs.benefit1.title', e.target.value)}
            placeholder="Fast Approval"
          />
        </div>
        <div className="form-group">
          <label>Benefit 1 Description:</label>
          <textarea
            value={content.whyChooseUs?.benefit1?.description || "Quick and efficient application process with rapid decisions."}
            onChange={(e) => updateField('whyChooseUs.benefit1.description', e.target.value)}
            placeholder="Describe the first benefit..."
          />
        </div>
        <ImageUpload
          label="Benefit 1 Icon"
          value={content.whyChooseUs?.benefit1?.icon || ""}
          onChange={(url) => updateField('whyChooseUs.benefit1.icon', url)}
          type="logos"
          placeholder="Upload icon for first benefit (will be shown as white on red background)"
        />
        
        <h4>Benefit 2</h4>
        <div className="form-group">
          <label>Benefit 2 Title:</label>
          <input
            type="text"
            value={content.whyChooseUs?.benefit2?.title || "Flexible Terms"}
            onChange={(e) => updateField('whyChooseUs.benefit2.title', e.target.value)}
            placeholder="Flexible Terms"
          />
        </div>
        <div className="form-group">
          <label>Benefit 2 Description:</label>
          <textarea
            value={content.whyChooseUs?.benefit2?.description || "Loan options tailored to fit your unique financial situation."}
            onChange={(e) => updateField('whyChooseUs.benefit2.description', e.target.value)}
            placeholder="Describe the second benefit..."
          />
        </div>
        <ImageUpload
          label="Benefit 2 Icon"
          value={content.whyChooseUs?.benefit2?.icon || ""}
          onChange={(url) => updateField('whyChooseUs.benefit2.icon', url)}
          type="logos"
          placeholder="Upload icon for second benefit (will be shown as white on red background)"
        />
        
        <h4>Benefit 3</h4>
        <div className="form-group">
          <label>Benefit 3 Title:</label>
          <input
            type="text"
            value={content.whyChooseUs?.benefit3?.title || "Easy Online Process"}
            onChange={(e) => updateField('whyChooseUs.benefit3.title', e.target.value)}
            placeholder="Easy Online Process"
          />
        </div>
        <div className="form-group">
          <label>Benefit 3 Description:</label>
          <textarea
            value={content.whyChooseUs?.benefit3?.description || "Apply from anywhere, anytime, with our user-friendly online platform."}
            onChange={(e) => updateField('whyChooseUs.benefit3.description', e.target.value)}
            placeholder="Describe the third benefit..."
          />
        </div>
        <ImageUpload
          label="Benefit 3 Icon"
          value={content.whyChooseUs?.benefit3?.icon || ""}
          onChange={(url) => updateField('whyChooseUs.benefit3.icon', url)}
          type="logos"
          placeholder="Upload icon for third benefit (will be shown as white on red background)"
        />
      </section>

      {/* Testimonials Section */}
      <section className="editor-section">
        <h3>Customer Testimonials</h3>
        <div className="form-group">
          <label>Section Title:</label>
          <input
            type="text"
            value={content.testimonials?.title || "What Our Customers Say"}
            onChange={(e) => updateTestimonials({
              ...content.testimonials || { title: "", subtitle: "", reviews: [] },
              title: e.target.value
            })}
          />
        </div>
        <div className="form-group">
          <label>Section Subtitle:</label>
          <textarea
            value={content.testimonials?.subtitle || "Hear from people who have transformed their financial situation with our services."}
            onChange={(e) => updateTestimonials({
              ...content.testimonials || { title: "", subtitle: "", reviews: [] },
              subtitle: e.target.value
            })}
          />
        </div>

        <div className="testimonials-list">
          <h4>Customer Reviews</h4>
          {(content.testimonials?.reviews || []).map((review, index) => (
            <div key={index} className="testimonial-item">
              <div className="testimonial-header">
                <h5>Review {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeTestimonial(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>

              <div className="form-group">
                <label>Rating (1-5):</label>
                <select
                  value={review.rating}
                  onChange={(e) => updateTestimonial(index, 'rating', parseFloat(e.target.value))}
                >
                  <option value={1}>1 Star</option>
                  <option value={1.5}>1.5 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={2.5}>2.5 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={3.5}>3.5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={4.5}>4.5 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>

              <div className="form-group">
                <label>Review Text:</label>
                <textarea
                  value={review.text}
                  onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                  placeholder="Enter the customer's review..."
                />
              </div>

              <div className="form-group">
                <label>Customer Name:</label>
                <input
                  type="text"
                  value={review.name}
                  onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label>Customer Title/Position:</label>
                <input
                  type="text"
                  value={review.title}
                  onChange={(e) => updateTestimonial(index, 'title', e.target.value)}
                  placeholder="Personal Loan Customer"
                />
              </div>

              <ImageUpload
                label="Customer Photo (Optional)"
                value={review.image || ""}
                onChange={(url) => updateTestimonial(index, 'image', url)}
                type="testimonials"
                placeholder="Upload customer photo or leave empty for default avatar"
              />
            </div>
          ))}

          <button type="button" onClick={addTestimonial} className="add-btn">
            Add New Testimonial
          </button>
        </div>
      </section>

      {/* Complaints Procedure Section */}
      <section className="editor-section">
        <h3>Complaints Procedure</h3>
        
        <ImageUpload
          label="Regulatory Authority Logo"
          value={content.complaintsProcedure?.logo || ""}
          onChange={(url) => updateField('complaintsProcedure.logo', url)}
          type="logos"
          placeholder="Upload regulatory authority logo (e.g., NAMFISA)"
        />
        
        <div className="form-group">
          <label>Section Title:</label>
          <input
            type="text"
            value={content.complaintsProcedure?.title || "Borrower's Complaints Procedure"}
            onChange={(e) => updateField('complaintsProcedure.title', e.target.value)}
            placeholder="Borrower's Complaints Procedure"
          />
        </div>
        
        <h4>Step 1 - Lodge Complaint</h4>
        <div className="form-group">
          <label>Step 1 Title:</label>
          <input
            type="text"
            value={content.complaintsProcedure?.step1?.title || "Lodge Complaint"}
            onChange={(e) => updateField('complaintsProcedure.step1.title', e.target.value)}
            placeholder="Lodge Complaint"
          />
        </div>
        <div className="form-group">
          <label>Step 1 Item 1:</label>
          <textarea
            value={content.complaintsProcedure?.step1?.item1 || "Contact your microlender directly regarding your complaint."}
            onChange={(e) => updateField('complaintsProcedure.step1.item1', e.target.value)}
            placeholder="First instruction for step 1..."
          />
        </div>
        <div className="form-group">
          <label>Step 1 Item 2:</label>
          <textarea
            value={content.complaintsProcedure?.step1?.item2 || "The microlender must respond within 20 business days."}
            onChange={(e) => updateField('complaintsProcedure.step1.item2', e.target.value)}
            placeholder="Second instruction for step 1..."
          />
        </div>
        
        <h4>Step 2 - Escalate</h4>
        <div className="form-group">
          <label>Step 2 Title:</label>
          <input
            type="text"
            value={content.complaintsProcedure?.step2?.title || "Escalate to NAMFISA"}
            onChange={(e) => updateField('complaintsProcedure.step2.title', e.target.value)}
            placeholder="Escalate to NAMFISA"
          />
        </div>
        <div className="form-group">
          <label>Step 2 Item 1:</label>
          <textarea
            value={content.complaintsProcedure?.step2?.item1 || "If unsatisfied with the response, escalate your complaint to NAMFISA."}
            onChange={(e) => updateField('complaintsProcedure.step2.item1', e.target.value)}
            placeholder="First instruction for step 2..."
          />
        </div>
        <div className="form-group">
          <label>Step 2 Item 2:</label>
          <textarea
            value={content.complaintsProcedure?.step2?.item2 || "Ensure you have written proof of your initial complaint."}
            onChange={(e) => updateField('complaintsProcedure.step2.item2', e.target.value)}
            placeholder="Second instruction for step 2..."
          />
        </div>
        
        <h4>Step 3 - Contact Channels</h4>
        <div className="form-group">
          <label>Step 3 Title:</label>
          <input
            type="text"
            value={content.complaintsProcedure?.step3?.title || "Contact Channels"}
            onChange={(e) => updateField('complaintsProcedure.step3.title', e.target.value)}
            placeholder="Contact Channels"
          />
        </div>
        <div className="form-group">
          <label>Step 3 Description:</label>
          <textarea
            value={content.complaintsProcedure?.step3?.description || "Submit your complaint through any of these channels:"}
            onChange={(e) => updateField('complaintsProcedure.step3.description', e.target.value)}
            placeholder="Description text for contact options..."
          />
        </div>
        <div className="form-group">
          <label>Visit Address:</label>
          <textarea
            value={content.complaintsProcedure?.step3?.address || "51-55 Werner List Street, Gutenberg Plaza, Windhoek, Namibia"}
            onChange={(e) => updateField('complaintsProcedure.step3.address', e.target.value)}
            placeholder="Physical address for visits..."
          />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            value={content.complaintsProcedure?.step3?.email || "complaints@namfisa.com.na"}
            onChange={(e) => updateField('complaintsProcedure.step3.email', e.target.value)}
            placeholder="complaints@authority.com"
          />
        </div>
        <div className="form-group">
          <label>Fax Number:</label>
          <input
            type="text"
            value={content.complaintsProcedure?.step3?.fax || "+264 61 290 5194"}
            onChange={(e) => updateField('complaintsProcedure.step3.fax', e.target.value)}
            placeholder="+264 61 290 5194"
          />
        </div>
      </section>

      {/* Footer Section */}
      <section className="editor-section">
        <h3>Footer</h3>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={content.footer?.address || "123 Finance Street, Capital City, 12345"}
            onChange={(e) => updateField('footer.address', e.target.value)}
            placeholder="Business address"
          />
        </div>
        
        <div className="form-group">
          <label>Business Hours:</label>
          <input
            type="text"
            value={content.footer?.hours || "Mon-Fri: 9:00 AM - 5:00 PM"}
            onChange={(e) => updateField('footer.hours', e.target.value)}
            placeholder="Business hours"
          />
        </div>

        <h4>Quick Links</h4>
        <div className="form-group">
          <label>Quick Links Title:</label>
          <input
            type="text"
            value={content.footer?.quickLinks?.title || "Quick Links"}
            onChange={(e) => updateField('footer.quickLinks.title', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>About Us Link:</label>
          <input
            type="text"
            value={content.footer?.quickLinks?.aboutUs || "About Us"}
            onChange={(e) => updateField('footer.quickLinks.aboutUs', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Loans Link:</label>
          <input
            type="text"
            value={content.footer?.quickLinks?.loans || "Loans"}
            onChange={(e) => updateField('footer.quickLinks.loans', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Careers Link:</label>
          <input
            type="text"
            value={content.footer?.quickLinks?.careers || "Careers"}
            onChange={(e) => updateField('footer.quickLinks.careers', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contact Us Link:</label>
          <input
            type="text"
            value={content.footer?.quickLinks?.contactUs || "Contact Us"}
            onChange={(e) => updateField('footer.quickLinks.contactUs', e.target.value)}
          />
        </div>

        <h4>Legal Links</h4>
        <div className="form-group">
          <label>Legal Title:</label>
          <input
            type="text"
            value={content.footer?.legal?.title || "Legal"}
            onChange={(e) => updateField('footer.legal.title', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Terms & Conditions:</label>
          <input
            type="text"
            value={content.footer?.legal?.terms || "Terms & Conditions"}
            onChange={(e) => updateField('footer.legal.terms', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Privacy Policy:</label>
          <input
            type="text"
            value={content.footer?.legal?.privacy || "Privacy Policy"}
            onChange={(e) => updateField('footer.legal.privacy', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Cookie Policy:</label>
          <input
            type="text"
            value={content.footer?.legal?.cookies || "Cookie Policy"}
            onChange={(e) => updateField('footer.legal.cookies', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Complaints Procedure:</label>
          <input
            type="text"
            value={content.footer?.legal?.complaints || "Complaints Procedure"}
            onChange={(e) => updateField('footer.legal.complaints', e.target.value)}
          />
        </div>

        <h4>Social Media</h4>
        <div className="form-group">
          <label>Social Media Title:</label>
          <input
            type="text"
            value={content.footer?.social?.title || "Connect With Us"}
            onChange={(e) => updateField('footer.social.title', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Facebook URL:</label>
          <input
            type="text"
            value={content.footer?.social?.facebook || ""}
            onChange={(e) => updateField('footer.social.facebook', e.target.value)}
            placeholder="https://facebook.com/yourpage"
          />
        </div>
        <ImageUpload
          label="Facebook Icon"
          value={content.footer?.social?.facebookIcon || ""}
          onChange={(url) => updateField('footer.social.facebookIcon', url)}
          type="logos"
          placeholder="Upload Facebook SVG icon (will be shown as white on dark background)"
        />
        
        <div className="form-group">
          <label>Twitter URL:</label>
          <input
            type="text"
            value={content.footer?.social?.twitter || ""}
            onChange={(e) => updateField('footer.social.twitter', e.target.value)}
            placeholder="https://twitter.com/yourhandle"
          />
        </div>
        <ImageUpload
          label="Twitter Icon"
          value={content.footer?.social?.twitterIcon || ""}
          onChange={(url) => updateField('footer.social.twitterIcon', url)}
          type="logos"
          placeholder="Upload Twitter SVG icon (will be shown as white on dark background)"
        />
        
        <div className="form-group">
          <label>LinkedIn URL:</label>
          <input
            type="text"
            value={content.footer?.social?.linkedin || ""}
            onChange={(e) => updateField('footer.social.linkedin', e.target.value)}
            placeholder="https://linkedin.com/company/yourcompany"
          />
        </div>
        <ImageUpload
          label="LinkedIn Icon"
          value={content.footer?.social?.linkedinIcon || ""}
          onChange={(url) => updateField('footer.social.linkedinIcon', url)}
          type="logos"
          placeholder="Upload LinkedIn SVG icon (will be shown as white on dark background)"
        />
        
        <div className="form-group">
          <label>Instagram URL:</label>
          <input
            type="text"
            value={content.footer?.social?.instagram || ""}
            onChange={(e) => updateField('footer.social.instagram', e.target.value)}
            placeholder="https://instagram.com/yourhandle"
          />
        </div>
        <ImageUpload
          label="Instagram Icon"
          value={content.footer?.social?.instagramIcon || ""}
          onChange={(url) => updateField('footer.social.instagramIcon', url)}
          type="logos"
          placeholder="Upload Instagram SVG icon (will be shown as white on dark background)"
        />

        <div className="form-group">
          <label>Copyright Text:</label>
          <input
            type="text"
            value={content.footer?.copyright || "© 2025 SkyLexfin Group. All rights reserved."}
            onChange={(e) => updateField('footer.copyright', e.target.value)}
            placeholder="Copyright notice"
          />
        </div>
      </section>
    </div>
  );
};

export default ContentEditor;