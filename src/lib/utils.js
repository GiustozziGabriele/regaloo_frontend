// lib/utils.js
import { push } from "notivue"


export const getHostname = (url) => {
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}

export const shareWishlist = async (wishlistId, title) => {
  const url = `${window.location.origin}/public/w/${wishlistId}`
  
  if (navigator.share) {
    // mobile — apre il foglio nativo di condivisione
    try {
      await navigator.share({
        title: 'Regaloo 🎁',
        text: `Ciao! Ho creato la wishlist ${title} su Regaloo 🎁, dai un'occhiata e prenota il tuo regalo 👇`,
        url
      })
    } catch (e) {
      // utente ha annullato — non fare nulla
      if (e.name !== 'AbortError') console.error(e)
    }
  } else {
    // desktop — copia il link
    await navigator.clipboard.writeText(url)
    push.success({ title: 'Link copiato!' })
  }
}

export const shareEvent= async (eventId, title) => {
  const url = `${window.location.origin}/public/e/${eventId}`
  
  if (navigator.share) {
    // mobile — apre il foglio nativo di condivisione
    try {
      await navigator.share({
        title: 'Regaloo 🎁',
        text: `Ciao! Ho creato l'evento ${title} su Regaloo 🎁, dai un'occhiata e prenota il tuo regalo 👇`,
        url
      })
    } catch (e) {
      // utente ha annullato — non fare nulla
      if (e.name !== 'AbortError') console.error(e)
    }
  } else {
    // desktop — copia il link
    await navigator.clipboard.writeText(url)
    push.success({ title: 'Link copiato!' })
  }
}