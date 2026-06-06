import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import {
  Button,
  Checkbox,
  Col,
  Form,
  NumberField,
  PageLayout,
  TextField,
} from 'sava-test/components'
import { useForm } from 'sava-test/hooks'

// Index route for /components/forms — the group's own page (a validation form).
export const Route = createFileRoute('/components/forms/')({
  component: FormsPage,
})

const schema = z.object({
  email: z.email('Enter a valid email'),
  age: z
    .number()
    .min(18, 'Must be at least 18')
    .max(120, 'Enter a real age')
    .nullable()
    .refine((v): boolean => v !== null, 'Required'),
  agree: z.boolean().refine((v) => v, 'You must accept'),
})

function FormsPage() {
  const form = useForm({
    schema,
    defaultValues: { email: '', age: null, agree: false },
    onSubmit: (values, { reset }) => {
      alert(JSON.stringify(values, null, 2))
      reset()
    },
  })

  return (
    <PageLayout>
      <Form form={form}>
        <Col gap="md" style={{ maxWidth: 420 }}>
          <TextField name="email" label="Email" placeholder="you@example.com" />
          <NumberField name="age" label="Age" min={0} max={120} />
          <Checkbox name="agree" label="I Accept The Terms" />
          <Button type="submit" loading={form.isSubmitting}>
            Submit
          </Button>
        </Col>
      </Form>
    </PageLayout>
  )
}
