import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, IdCard, ChevronDown, Lock, ArrowLeft } from "lucide-react"
import logo from '../assets/edunova-logo.webp'
import campus from '../assets/gate.webp'

const studentTypes = [
  { code: 'UG', label: 'Undergraduate' },
  { code: 'PG', label: 'Postgraduate' },
  { code: 'ODL', label: 'Open & Distance Learning' },
  { code: 'PC', label: 'Professional Certificate' },
  { code: 'IP', label: 'International Programme' },
]

// --- ID Input component ---
function IdInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [role, setRole] = useState<'student' | 'staff'>('student')
  const [type, setType] = useState(studentTypes[0].code)
  const [typeOpen, setTypeOpen] = useState(false)
  const [rest, setRest] = useState('')

  const buildId = (nextType: string, nextRole: 'student' | 'staff', nextRest: string) => {
    const clean = nextRest.replace(/[^0-9]/g, '')
    const year = clean.slice(0, 4)
    const number = clean.slice(4, 8)
    const segments = ['EDU', nextRole === 'staff' ? 'STF' : nextType, year, number].filter(Boolean)
    return segments.join('/')
  }

  const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRest(e.target.value)
    onChange(buildId(type, role, e.target.value))
  }

  const handleTypeSelect = (code: string) => {
    setType(code)
    setTypeOpen(false)
    onChange(buildId(code, role, rest))
  }

  const handleRoleChange = (nextRole: 'student' | 'staff') => {
    setRole(nextRole)
    onChange(buildId(type, nextRole, rest))
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <label className='font-mono text-xs tracking-wide uppercase text-black/50'>
          Staff or Student ID
        </label>
        <div className='flex bg-black/5 rounded-full p-0.5'>
          <button
            type='button'
            onClick={() => handleRoleChange('student')}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              role === 'student' ? 'bg-white text-[#1E3A8A] shadow-sm' : 'text-black/50'
            }`}
          >
            Student
          </button>
          <button
            type='button'
            onClick={() => handleRoleChange('staff')}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              role === 'staff' ? 'bg-white text-[#1E3A8A] shadow-sm' : 'text-black/50'
            }`}
          >
            Staff
          </button>
        </div>
      </div>

      <div className='relative flex items-center border border-black/15 rounded-lg focus-within:border-[#1E3A8A] transition-colors'>
        <IdCard size={17} strokeWidth={1.5} className='absolute left-3.5 text-black/30' />

        <span className='pl-11 pr-1 py-3 text-sm font-mono text-black/40 select-none'>
          EDU/
        </span>

        {role === 'student' && (
          <div className='relative'>
            <button
              type='button'
              onClick={() => setTypeOpen(!typeOpen)}
              className='flex items-center gap-1 text-sm font-mono text-[#1E3A8A] font-medium py-3'
            >
              {type}
              <ChevronDown size={14} className={`transition-transform ${typeOpen ? 'rotate-180' : ''}`} />
            </button>
            {typeOpen && (
              <div className='absolute top-full left-0 mt-1 bg-white border border-black/10 rounded-lg shadow-lg overflow-hidden z-20 w-56'>
                {studentTypes.map((t) => (
                  <button
                    key={t.code}
                    type='button'
                    onClick={() => handleTypeSelect(t.code)}
                    className='w-full text-left px-4 py-2.5 text-sm hover:bg-black/[0.03] transition-colors flex items-center justify-between'
                  >
                    <span className='text-black/70'>{t.label}</span>
                    <span className='font-mono text-xs text-black/40'>{t.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {role === 'staff' && (
          <span className='text-sm font-mono text-[#1E3A8A] font-medium py-3'>STF</span>
        )}

        <span className='text-sm font-mono text-black/40 px-1'>/</span>

        <input
          type='text'
          inputMode='numeric'
          required
          value={rest}
          onChange={handleRestChange}
          placeholder={role === 'staff' ? '2024/0089' : '2026/00000'}
          maxLength={9}
          className='flex-1 py-3 pr-4 text-sm font-mono focus:outline-none min-w-0'
        />
      </div>

      <p className='text-xs text-black/40 pl-1'>
        {role === 'staff' ? 'Format: EDU/STF/Year/StaffNumber' : 'Format: EDU/Type/Year/StudentNumber'}
      </p>
    </div>
  )
}

// --- Main Login page ---
export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ id: '', password: '' })
  const [remember, setRemember] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form, remember)
  }

  return (
    <div className='min-h-screen flex'>
      <div className='hidden lg:block relative w-1/2'>
        <img src={campus} alt="EduNova University campus" className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-[#0B1524]/90 via-[#0B1524]/50 to-[#0B1524]/20' />

        <div className='absolute inset-0 flex flex-col justify-between p-12'>
          <a href='https://eadwyne-edunova.vercel.app/' className='flex items-center gap-2 w-fit'>
            <img src={logo} alt="EduNova" className='h-15 w-auto' />
          </a>
          <div>
            <h2 className='font-serif text-white text-4xl font-semibold leading-tight max-w-md mb-4'>Your journey continues here.</h2>
            <p className='font-sans text-white/70 text-base max-w-sm leading-relaxed'>Access your courses, results, and campus resources — all in one place.</p>
          </div>
          <p className='font-mono text-xs text-white/40'>© 2026 EduNova University</p>
        </div>
      </div>

      <div className='w-full lg:w-1/2 flex items-center justify-center px-2 sm:px-12 py-16 bg-white'>
        <div className='w-full max-w-sm'>
          <Link to='/' className='flex lg:hidden items-center gap-2 mb-10'>
            <img src={logo} alt="EduNova" className='h-10 w-auto' />
          </Link>

          <a href="https://eadwyne-edunova.vercel.app/" className='hidden lg:inline-flex items-center gap-2 text-sm text-black/50 hover:text-[#1E3A8A] transition-colors mb-10'>
            <ArrowLeft size={16} />
            Back to website
          </a>

          <h1 className='font-serif text-3xl md:text-4xl font-semibold text-[#14263F] mt-3 mb-2'>Sign In</h1>
          <p className='font-sans text-black/55 text-sm mb-8'>Enter your credentials to access your portal.</p>

          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <IdInput value={form.id} onChange={(val) => setForm({ ...form, id: val })} />

            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='font-mono text-xs tracking-wide uppercase text-black/50'>Password</label>
                <Link to='/forgot-password' className='text-xs text-[#1E3A8A] hover:underline'>Forgot password?</Link>
              </div>
              <div className='relative'>
                <Lock size={17} strokeWidth={1.5} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30' />
                <input id='password' name='password' type={showPassword ? 'text' : 'password'} required value={form.password} onChange={handleChange} placeholder='••••••••' className='w-full border border-black/15 rounded-lg pl-11 pr-11 py-3 text-sm font-sans focus:outline-none focus:border-[#1E3A8A] transition-colors'/>
                <button type='button' onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className='absolute right-3.5 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors'>
                  {showPassword ? <EyeOff size={17} strokeWidth={1.5} /> : <Eye size={17} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <label className='flex items-center gap-2 cursor-pointer w-fit'>
              <input type='checkbox' checked={remember} onChange={() => setRemember(!remember)} className='w-4 h-4 rounded border-black/20 accent-[#1E3A8A]'/>
              <span className='text-sm text-black/60'>Keep me signed in</span>
            </label>

            <button type='submit' className='bg-[#14263F] text-[#F6F6F2] py-3.5 rounded-lg font-semibold text-sm mt-2 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-md'>
              Sign In
            </button>
          </form>
        </div>
        <div>
          <div>Undergraduate</div>
        </div>
      </div>
    </div>
  )
}