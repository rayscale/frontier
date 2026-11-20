import {
  Accordion,
  Bell,
  Checkbox,
  Mail,
  NumberFlow,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Settings,
  Slider,
  Sparkles,
  Switch,
  Tabs,
  type TSymbolComponent,
} from '@rayscale/frontier'
import type { ReactElement, ReactNode } from 'react'

import { useTick } from './use-tick.js'

function Cell({ label, children }: { label: string; children: ReactNode }): ReactElement {
  return (
    <section className="showcase__cell" aria-label={`${label} demo`}>
      <h3 className="showcase__label">{label}</h3>
      {/* The demo plays by itself, so it stays out of the tab order and the reading order. */}
      <div className="showcase__stage" inert aria-hidden="true">
        {children}
      </div>
    </section>
  )
}

const noop = (): void => undefined

function SwitchDemo(): ReactElement {
  const tick = useTick(1800)

  return (
    <div className="showcase__stack">
      <Switch label="Airplane mode" checked={tick % 2 === 0} onChange={noop} />
      <Switch label="Wi-Fi" checked={tick % 2 === 1} onChange={noop} />
    </div>
  )
}

const tabs = [
  { value: 'overview', text: 'Everything at a glance.' },
  { value: 'analytics', text: 'Trends over the last week.' },
  { value: 'reports', text: '5 reports are ready to export.' },
]

function TabsDemo(): ReactElement {
  const active = tabs[useTick(2200) % tabs.length]

  return (
    <Tabs value={active?.value ?? 'overview'}>
      <Tabs.List aria-label="Sections">
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value}>
            {tab.value[0]?.toUpperCase()}
            {tab.value.slice(1)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value}>
          {tab.text}
        </Tabs.Content>
      ))}
    </Tabs>
  )
}

const questions = [
  { value: 'accessible', title: 'Is it accessible?', text: 'Yes, it starts from native HTML.' },
  { value: 'animated', title: 'Is it animated?', text: 'Yes, and it respects reduced motion.' },
  { value: 'styled', title: 'Can I style it?', text: 'Everything reads from shared tokens.' },
]

function AccordionDemo(): ReactElement {
  const active = questions[useTick(2600) % questions.length]

  return (
    <Accordion type="single" value={active?.value ?? null}>
      {questions.map((question) => (
        <Accordion.Item key={question.value} value={question.value} title={question.title}>
          {question.text}
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

const tasks = ['Book the studio', 'Send the estimate', 'Pick a typeface']

function CheckboxDemo(): ReactElement {
  const done = useTick(1200) % (tasks.length + 1)

  return (
    <div className="showcase__stack">
      {tasks.map((task, index) => (
        <Checkbox key={task} label={task} checked={index < done} onChange={noop} />
      ))}
    </div>
  )
}

function NumberDemo(): ReactElement {
  const tick = useTick(1400)

  return (
    <div className="showcase__number">
      <NumberFlow value={14222 + ((tick * 37) % 900)} />
      <span className="showcase__caption">installs this week</span>
    </div>
  )
}

const densities = [
  { value: 'default', label: 'Default' },
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
]

function RadioDemo(): ReactElement {
  const active = densities[useTick(1700) % densities.length]?.value ?? 'default'

  return (
    <RadioGroup aria-label="Density" value={active} onValueChange={noop}>
      {densities.map((density) => (
        <RadioGroupItem key={density.value} value={density.value} label={density.label} />
      ))}
    </RadioGroup>
  )
}

const symbols: TSymbolComponent[] = [Bell, Mail, Settings, Sparkles]

function SymbolsDemo(): ReactElement {
  const active = useTick(900) % symbols.length

  return (
    <div className="showcase__symbols">
      {symbols.map((Symbol, index) => (
        <span key={index} className="showcase__symbol" data-active={index === active || undefined}>
          <Symbol size={28} aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}

function ProgressDemo(): ReactElement {
  const value = (useTick(700) * 17) % 101

  return (
    <div className="showcase__progress">
      <p>
        <span>Uploading</span>
        <span>{value}%</span>
      </p>
      <Progress aria-label="Upload" value={value} />
    </div>
  )
}

function SliderDemo(): ReactElement {
  const value = 15 + ((useTick(500) * 9) % 71)

  return <Slider label="Volume" value={value} onValueChange={noop} />
}

/** A grid of components that play on their own. Every one is the real component. */
export function Showcase(): ReactElement {
  return (
    <div className="showcase">
      <Cell label="Switch">
        <SwitchDemo />
      </Cell>
      <Cell label="Tabs">
        <TabsDemo />
      </Cell>
      <Cell label="Accordion">
        <AccordionDemo />
      </Cell>
      <Cell label="Checkbox">
        <CheckboxDemo />
      </Cell>
      <Cell label="Number flow">
        <NumberDemo />
      </Cell>
      <Cell label="Radio group">
        <RadioDemo />
      </Cell>
      <Cell label="Symbols">
        <SymbolsDemo />
      </Cell>
      <Cell label="Progress">
        <ProgressDemo />
      </Cell>
      <Cell label="Slider">
        <SliderDemo />
      </Cell>
    </div>
  )
}
