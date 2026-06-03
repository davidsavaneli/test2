import { createFileRoute } from '@tanstack/react-router'
import { Typography } from 'sava-test'
import { Page } from '../../../components/Page'

export const Route = createFileRoute('/components/display/typography')({
  staticData: { name: 'Typography', order: 0 },
  component: TypographyPage,
})

function TypographyPage() {
  return (
    <Page title="Typography" description="The type scale — one variant per row.">
      <div className="card demo-stack">
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="subtitle">Subtitle</Typography>
        <Typography variant="body">Body — the default text variant.</Typography>
        <Typography variant="bodySmall">Body small — secondary text.</Typography>
        <Typography variant="caption">Caption — the smallest text.</Typography>
        <Typography variant="uppercase">Uppercase label</Typography>
      </div>
    </Page>
  )
}
