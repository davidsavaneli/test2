import { createFileRoute } from '@tanstack/react-router'
import { Icon, TextField } from 'sava-test'
import { Page } from '../../../../components/Page'

export const Route = createFileRoute('/components/forms/text-field/')({
  staticData: { name: 'Text Field', order: 2 },
  component: TextFieldPage,
})

function TextFieldPage() {
  return (
    <Page title="Text Field" description="Labeled text input with adornments, masks and states.">
      <div className="card demo-col">
        <TextField label="Label" placeholder="Type here" />
        <TextField label="With Prefix" adornment="https://" adornmentPosition="left" placeholder="example.com" />
        <TextField
          label="With Icon"
          adornment={<Icon name="SearchNormal" />}
          adornmentPosition="left"
          placeholder="Search"
        />
        <TextField label="Phone Mask" mask="(999) 999-9999" placeholder="(555) 123-4567" />
        <TextField label="Password" type="password" placeholder="Secret" />
        <TextField label="Error" error helperText="This field is required" defaultValue="Wrong value" />
        <TextField label="Disabled" disabled placeholder="Disabled" />
      </div>
    </Page>
  )
}
