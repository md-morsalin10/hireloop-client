import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { Card, Button } from '@heroui/react'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details, id: transactionId } = session
  const customerEmail = customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8 flex flex-col items-center justify-center relative overflow-hidden select-none">
        
        {/* Background Premium Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute top-12 left-12 w-72 h-72 bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="w-full max-w-md z-10">
          <Card className="bg-[#0c0c0e]/90 backdrop-blur-md border border-[#1c1c21] p-8 rounded-[28px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center text-center relative overflow-hidden">
            
            {/* Top Border Glow Decorator */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />

            {/* Success Icon Animation Wrapper */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-md animate-ping opacity-60" />
              <div className="w-20 h-20 bg-gradient-to-b from-green-500/20 to-green-500/5 rounded-full flex items-center justify-center ring-1 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <svg 
                  className="w-10 h-10 text-green-400 drop-shadow-[0_2px_8px_rgba(34,197,94,0.4)]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Header */}
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white to-[#a1a1a6] bg-clip-text text-transparent">
              Payment Successful!
            </h1>
            <p className="text-sm text-[#86868b] mt-3 px-1 leading-relaxed">
              Thank you for your trust. Your premium workspace features are now unlocked and ready to use.
            </p>

            <div className="w-full border-t border-dashed border-[#1c1c21] my-6" />

            {/* Receipt Details Box */}
            <div className="w-full bg-[#141417] border border-[#1c1c21] rounded-2xl p-5 text-left flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-[#636366] tracking-wide">Account Email</span>
                <span className="text-xs text-[#e5e5ea] font-semibold truncate max-w-[210px]" title={customerEmail}>
                  {customerEmail}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-[#636366] tracking-wide">Payment Status</span>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full font-bold uppercase tracking-widest text-[9px] shadow-[0_2px_10px_rgba(34,197,94,0.1)]">
                  Completed
                </span>
              </div>
              
              <div className="flex flex-col gap-1.5 border-t border-[#1c1c21] pt-4 mt-1">
                <span className="text-[#636366] text-[11px] font-medium tracking-wide">Stripe Reference ID</span>
                <div className="flex items-center justify-between gap-2 bg-[#0c0c0e] border border-[#1c1c21] p-2.5 rounded-xl">
                  <span className="text-[#86868b] text-[10px] font-mono break-all select-text font-medium leading-normal max-w-[280px]">
                    {transactionId}
                  </span>
                </div>
              </div>
            </div>

            {/* Support Information */}
            <p className="text-[11px] text-[#636366] mt-6 leading-relaxed px-2">
              An invoice has been dispatched to your inbox. For assistance, reach us at{' '}
              <a href="mailto:support@hireloop.com" className="text-white hover:text-[#bf5af2] transition-colors font-medium underline underline-offset-2">
                support@hireloop.com
              </a>.
            </p>

            {/* Action Button */}
            <div className="w-full mt-8">
              {/* FIXED: এখানে বাটনটির ভেতরে Link ব্যবহার করা হয়েছে, যা Server Layer প্যানিক এড়ায় */}
              <Button 
                variant="solid"
                className="w-full h-12 p-0 text-sm font-semibold rounded-xl tracking-wide bg-[#1c1c1f] hover:bg-white border border-[#2c2c2e] hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 active:scale-[0.98] overflow-hidden"
              >
                <Link 
                  href="/pricing" 
                  className="w-full h-full flex items-center justify-center text-[#f5f5f7] hover:text-black transition-colors duration-300"
                >
                  Go to Dashboard
                </Link>
              </Button>
            </div>

          </Card>
        </div>
      </div>
    )
  }
}