import { FormEvent, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import mainImage from '@/assets/images/cringy.jpg'
import { Form, Button, Spinner } from 'react-bootstrap'


export default function Home() {
  const [quote, setQuote] = useState('')
  const [loading, setLoading] = useState(false)
  const [quoteLoadingError, setQuoteLoadingError] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const prompt = formData.get('prompt')?.toString().trim()
    if(prompt) {
      try {
        setQuote('')
        setQuoteLoadingError(false)
        setLoading(true)
        const response = await fetch('/api/cringe?prompt=' + encodeURIComponent(prompt))
        const body = await response.json()
        setQuote(body.quote)
      } catch (error) {
        console.error(error)
        setQuoteLoadingError(true)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Cringe-AI</title>
        <meta name="description" content="Create cringy motivational quotes by PatriciaGM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Cringe AI</h1>
        <h2 className={styles.subtitle}>powered by GPT-3</h2>
        <div className={styles.note}>Enter a topic and the AI will generate a super cringy motivational quote</div>
        <div className={styles.mainImgContainer}>
        <Image src={mainImage} alt='Cringy!' fill priority className={styles.mainImg} />
        </div>
        <Form className={styles.inputForm} onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId="prompt-input">
            <Form.Label>Create a cringy quote about...</Form.Label>
            <Form.Control maxLength={100} name='prompt' type="text" placeholder="e.g. success, fear, potatos..." />
          </Form.Group>
          <Button type='submit' disabled={loading} className='mb-3'>Make me cringe🌈</Button>
        </Form>
        {loading && <Spinner animation='border' />}
        {quoteLoadingError && '☹️Somenthing went wrong. Please try again.'}
        {quote && <h5 className='mt-5'>{quote}</h5> }
      </main>
    </>
  )
}
