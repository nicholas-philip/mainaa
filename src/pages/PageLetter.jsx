import { motion } from 'framer-motion'

const LETTER = `My dearest Mainaa (my beab),

You are the bestest gift God has ever given me in this life. Not just a partner — you are my home, my peace, my safe place in a world that doesn't always make sense.

You understood me when no one else did. You stayed through the quiet moments, the moody days, the storms I never asked you to weather — and you stayed anyway. That means everything to me, Mainaa.

Even when I go quiet or get lost in my head, please know — it has never been about you. My love for you doesn't switch off. If anything, it just runs deeper in silence.

You've listened to all my nonsense, all my thoughts, all my feelings — and somehow, you always had more to give. You said "continue" even when I rambled too long, and my beab, that patience is one of the most beautiful things about you.

Distance is hard. Sometimes I wish I could just reach through the screen and hold you tight, Mainaa. But even with miles between us, you're still the first person I think of when I wake up, and the last thought before I close my eyes.

One day the distance won't matter anymore. And on that day — I'm never letting go.

I know I'm not always perfect. I can be annoying, quiet, overthinking — but thank you for loving me through all of it. You didn't have to. But you chose to. Every. Single. Time.

Without you, Mainaa, I'm incomplete. You are the sugar in my tea 🍵 — so sweet and so needed.

A girl like you is rare, beab. And I am the luckiest person alive to have you. 

Today, and every day after — Forever Yours, my beab. ❤️`

export default function PageLetter() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-scrap p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="scrap-scroll relative h-full w-full max-w-sm overflow-y-auto rounded-2xl p-5"
        style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.25)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
      >
        <p className="font-script text-sm leading-7 text-white/95 sm:text-base whitespace-pre-line">
          {LETTER}
        </p>
      </motion.div>
    </div>
  )
}
