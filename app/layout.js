import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Secure Key Gen',
  description: 'Secure Key Gen Password Generator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          reverseOrder={false} />
      </body>
    </html>
  )
}
