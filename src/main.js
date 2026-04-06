import './style.css'

// ============================================================
// CoreImpactAI — Main JS
// Smooth scroll · FAQ accordion · Form · Scroll animations
// ============================================================

// ---- Smooth scroll for anchor links ------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href')
    if (href === '#') return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

// ---- FAQ Accordion ------------------------------------------
document.querySelectorAll('.faq-item').forEach(item => {
  const button = item.querySelector('.faq-question')
  const answer = item.querySelector('.faq-answer')
  const icon = item.querySelector('.faq-icon')

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('open')

    // Close all open items
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open')
      openItem.querySelector('.faq-answer').style.maxHeight = '0'
      openItem.querySelector('.faq-icon').textContent = '+'
    })

    // Open the clicked item if it was closed
    if (!isOpen) {
      item.classList.add('open')
      answer.style.maxHeight = answer.scrollHeight + 'px'
      icon.textContent = '\u2014' // em dash
    }
  })
})

// ---- Form handling ------------------------------------------
const form = document.getElementById('audit-form')
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault()
    const btn = form.querySelector('[type="submit"]')
    const originalText = btn.textContent
    btn.textContent = 'Sending\u2026'
    btn.disabled = true
    btn.style.opacity = '0.7'

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        // Replace form with confirmation message
        const section = form.closest('section')
        form.style.opacity = '0'
        form.style.transition = 'opacity 0.4s ease'
        setTimeout(() => {
          form.innerHTML = `
            <div class="py-16 max-w-xl">
              <p class="font-serif font-black text-4xl lg:text-5xl text-cream leading-tight mb-6">
                Thanks.
              </p>
              <p class="font-sans text-lg text-cream/70 leading-relaxed">
                A real human — backed by some very capable AI — will review your answers and reply within 48 hours.
              </p>
            </div>
          `
          form.style.opacity = '1'
        }, 400)
      } else {
        btn.textContent = originalText
        btn.disabled = false
        btn.style.opacity = '1'
        showFormError(form)
      }
    } catch {
      btn.textContent = originalText
      btn.disabled = false
      btn.style.opacity = '1'
      showFormError(form)
    }
  })
}

function showFormError(form) {
  let err = form.querySelector('.form-error')
  if (!err) {
    err = document.createElement('p')
    err.className = 'form-error font-sans text-sm text-red-400 mt-4'
    err.textContent = 'Something went wrong. Please try again or email pete@coreimpact.ai directly.'
    form.appendChild(err)
  }
  err.style.display = 'block'
  setTimeout(() => { err.style.display = 'none' }, 6000)
}

// ---- Intersection Observer for scroll animations -----------
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Respect animation-delay set via inline style
        const delay = parseFloat(entry.target.style.animationDelay || '0') * 1000
        setTimeout(() => {
          entry.target.classList.add('in-view')
        }, delay)
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
)

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el)
})

// ---- Nav: shrink on scroll ----------------------------------
const nav = document.querySelector('nav')
let lastScroll = 0

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY
  if (scrollY > 80) {
    nav.style.borderBottomWidth = '1px'
  } else {
    nav.style.borderBottomWidth = '2px'
  }
  lastScroll = scrollY
}, { passive: true })
