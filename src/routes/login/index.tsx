import { useState } from 'react'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { Button, Checkbox, Form, TextField, Typography } from 'sava-test/components'
import { useForm } from 'sava-test/hooks'
import { auth } from '../../auth'

// No `staticData.name` → never shown in the sidebar menu.
export const Route = createFileRoute('/login/')({
  beforeLoad: () => {
    if (auth.isAuthed()) throw redirect({ to: '/' })
  },
  component: LoginPage,
})

const schema = z.object({
  login: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
  keep: z.boolean(),
})

function LoginPage() {
  const navigate = useNavigate()
  const [failed, setFailed] = useState(false)

  const form = useForm({
    schema,
    defaultValues: { login: '', password: '', keep: false },
    onSubmit: async (v) => {
      if (await auth.login(v.login, v.password, v.keep)) {
        navigate({ to: '/' })
      } else {
        setFailed(true)
      }
    },
  })

  return (
    <div className="login-screen">
      <div className="card login-card">
        <Typography variant="h3" align="center">
          Sign In
        </Typography>
        <Form
          form={form}
          style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}
        >
          <TextField name="login" label="Username or Email" placeholder="you@example.com" />
          <TextField name="password" type="password" label="Password" placeholder="••••••••" />
          <Checkbox name="keep" label="Keep Me Signed In" />
          {failed ? (
            <Typography variant="bodySmall" color="error">
              Invalid username or password
            </Typography>
          ) : null}
          <Button type="submit" fullWidth loading={form.isSubmitting}>
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  )
}
