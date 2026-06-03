import type { ReactNode } from 'react'
import { Typography } from 'sava-test'

/** Standard demo-page shell: a header (title + optional description) over the content. */
export function Page({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="page-header">
        <Typography variant="h2">{title}</Typography>
        {description ? (
          <Typography variant="body" color="tertiary">
            {description}
          </Typography>
        ) : null}
      </div>
      {children}
    </div>
  )
}
