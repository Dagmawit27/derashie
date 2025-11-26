import { supabase } from './supabase.js'

export function setupVolunteerForm() {
  const form = document.getElementById('volunteer-form')
  const messageDiv = document.getElementById('volunteer-message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const data = {
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      interest_area: formData.get('interest_area') || '',
      message: formData.get('message') || ''
    }

    form.classList.add('loading')
    messageDiv.innerHTML = ''

    const { error } = await supabase
      .from('volunteers')
      .insert([data])

    form.classList.remove('loading')

    if (error) {
      messageDiv.innerHTML = `
        <div class="form-message error">
          There was an error submitting your application. Please try again.
        </div>
      `
      console.error('Error:', error)
    } else {
      messageDiv.innerHTML = `
        <div class="form-message success">
          Thank you for your interest in volunteering! We'll be in touch with you soon.
        </div>
      `
      form.reset()

      setTimeout(() => {
        messageDiv.innerHTML = ''
      }, 5000)
    }
  })
}

export function setupContactForm() {
  const form = document.getElementById('contact-form')
  const messageDiv = document.getElementById('contact-message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      subject: formData.get('subject'),
      message: formData.get('message')
    }

    form.classList.add('loading')
    messageDiv.innerHTML = ''

    const { error } = await supabase
      .from('contact_submissions')
      .insert([data])

    form.classList.remove('loading')

    if (error) {
      messageDiv.innerHTML = `
        <div class="form-message error">
          There was an error sending your message. Please try again.
        </div>
      `
      console.error('Error:', error)
    } else {
      messageDiv.innerHTML = `
        <div class="form-message success">
          Thank you for contacting us! We'll respond to your message as soon as possible.
        </div>
      `
      form.reset()

      setTimeout(() => {
        messageDiv.innerHTML = ''
      }, 5000)
    }
  })
}
