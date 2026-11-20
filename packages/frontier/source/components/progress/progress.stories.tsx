import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'

import { Progress, type TProgressProps } from './progress.js'

const meta = {
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Task progress',
    value: 40,
  },
  decorators: [
    (TStory) => (
      <div style={{ width: 320 }}>
        <TStory />
      </div>
    ),
  ],
} satisfies Meta<TProgressProps>

export default meta

type TStory = StoryObj<TProgressProps>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The default linear progress bar.',
      },
    },
  },
}

export const Indeterminate: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate progress bar indicating loading without a known completion value.',
      },
    },
  },
  args: {
    'aria-label': 'Loading',
    value: undefined,
  },
}

export const Values: TStory = {
  parameters: { docs: { description: { story: 'Shows the values example of the progress.' } } },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Progress aria-label="Quarter one" value={12} />
      <Progress aria-label="Quarter two" value={38} />
      <Progress aria-label="Quarter three" value={64} />
      <Progress aria-label="Quarter four" value={91} />
    </div>
  ),
}

export const ZeroAndComplete: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the zero and complete example of the progress.' } },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Progress aria-label="Not started" value={0} />
      <Progress aria-label="Complete" value={100} />
    </div>
  ),
}

export const CustomMaximum: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the custom maximum example of the progress.' } },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Progress aria-label="Steps completed" max={4} value={3} />
      <Progress aria-label="Files processed" max={250} value={180} />
    </div>
  ),
}

export const Sizes: TStory = {
  parameters: { docs: { description: { story: 'Shows the sizes example of the progress.' } } },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Progress aria-label="Small" size="small" value={60} />
      <Progress aria-label="Medium" size="medium" value={60} />
      <Progress aria-label="Large" size="large" value={60} />
    </div>
  ),
}

export const CustomAppearance: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the custom appearance example of the progress.' } },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Progress aria-label="Custom thickness" thickness={12} value={55} />
      <Progress aria-label="Success color" color="success" trackColor="strong" value={75} />
      <Progress aria-label="Danger color" color="danger" value={30} />
      <Progress aria-label="Square corners" radius={0} value={45} />
      <Progress aria-label="Custom color" color="#0ea5e9" radius="md" value={80} />
    </div>
  ),
}

export const AnimationDisabled: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the animation disabled example of the progress.' } },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Progress animation="none" aria-label="Determinate without animation" value={70} />
      <Progress animation="none" aria-label="Indeterminate without animation" value={undefined} />
    </div>
  ),
}

export const Circular: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Circular progress spinner indicator variant.',
      },
    },
  },
  args: {
    'aria-label': 'Task progress',
    variant: 'circular',
    value: 65,
  },
}

export const CircularIndeterminate: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate circular spinner indicator.',
      },
    },
  },
  args: {
    'aria-label': 'Loading',
    variant: 'circular',
    value: undefined,
  },
}

export const Variants: TStory = {
  parameters: { docs: { description: { story: 'Shows the variants example of the progress.' } } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Progress aria-label="Linear progress" value={65} />
      <Progress aria-label="Circular progress" variant="circular" value={65} />
    </div>
  ),
}

export const CircularValues: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the circular values example of the progress.' } },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <Progress aria-label="Not started" variant="circular" value={0} />
      <Progress aria-label="Quarter complete" variant="circular" value={25} />
      <Progress aria-label="Half complete" variant="circular" value={50} />
      <Progress aria-label="Three quarters complete" variant="circular" value={75} />
      <Progress aria-label="Complete" variant="circular" value={100} />
    </div>
  ),
}

export const CircularSizes: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the circular sizes example of the progress.' } },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <Progress aria-label="Small ring" size="small" value={60} variant="circular" />
      <Progress aria-label="Medium ring" size="medium" value={60} variant="circular" />
      <Progress aria-label="Large ring" size="large" value={60} variant="circular" />
      <Progress aria-label="48 pixel ring" size={48} thickness={6} value={60} variant="circular" />
    </div>
  ),
}

export const CircularAppearance: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the circular appearance example of the progress.' } },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <Progress aria-label="Thick ring" size={64} thickness={10} value={55} variant="circular" />
      <Progress
        aria-label="Success ring"
        color="success"
        trackColor="strong"
        value={75}
        variant="circular"
      />
      <Progress aria-label="Danger ring" color="danger" value={30} variant="circular" />
      <Progress aria-label="Custom color ring" color="#0ea5e9" value={80} variant="circular" />
    </div>
  ),
}

export const CircularAnimationDisabled: TStory = {
  parameters: {
    docs: {
      description: { story: 'Shows the circular animation disabled example of the progress.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Progress
        animation="none"
        aria-label="Determinate ring without animation"
        value={70}
        variant="circular"
      />
      <Progress
        animation="none"
        aria-label="Indeterminate ring without animation"
        value={undefined}
        variant="circular"
      />
    </div>
  ),
}

interface TUploadExampleProps {
  readonly fileName: string
  readonly totalBytes: number
}

function UploadExample({ fileName, totalBytes }: TUploadExampleProps) {
  const [uploadedBytes, setUploadedBytes] = useState(0)
  const completeState = uploadedBytes >= totalBytes

  useEffect(() => {
    if (completeState) {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      setUploadedBytes((current) => Math.min(current + totalBytes / 10, totalBytes))
    }, 400)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [completeState, totalBytes, uploadedBytes])

  const percentage = Math.round((uploadedBytes / totalBytes) * 100)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div aria-hidden="true">
            <Progress max={totalBytes} size="small" value={uploadedBytes} variant="circular" />
          </div>
          <span>{fileName}</span>
        </div>
        <span>{completeState ? 'Uploaded' : `${String(percentage)}%`}</span>
      </div>
      <Progress aria-label={`Uploading ${fileName}`} max={totalBytes} value={uploadedBytes} />
      <button
        type="button"
        onClick={() => {
          setUploadedBytes(0)
        }}
        style={{ justifySelf: 'start' }}
      >
        Restart upload
      </button>
    </div>
  )
}

export const Upload: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A realistic file upload progress pattern combining circular and linear indicators.',
      },
    },
  },
  render: () => <UploadExample fileName="quarterly-report.pdf" totalBytes={10} />,
}
