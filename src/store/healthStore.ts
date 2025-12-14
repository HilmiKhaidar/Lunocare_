import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { format, isToday, startOfWeek, endOfWeek } from 'date-fns'
import { id } from 'date-fns/locale'
import { generateId } from '../utils/storage'

export interface HealthEntry {
  id: string
  date: string
  energy: number // 1-5 scale
  focus: number // 1-5 scale
  stress: number // 1-5 scale
  mood: number // 1-5 scale
  sleep: number // hours
  water: number // glasses
  exercise: boolean
  notes: string
  createdAt: string
}

interface HealthStore {
  entries: HealthEntry[]
  addEntry: (entry: Omit<HealthEntry, 'id' | 'createdAt'>) => void
  updateEntry: (id: string, entry: Partial<HealthEntry>) => void
  getEntry: (date: string) => HealthEntry | undefined
  getTodayEntry: () => HealthEntry | undefined
  hasCheckedInToday: () => boolean
  getWeekEntries: () => HealthEntry[]
  getAverages: (entries: HealthEntry[]) => {
    energy: number
    focus: number
    stress: number
    mood: number
    sleep: number
    water: number
  }
}

export const useHealthStore = create<HealthStore>()(
  persist(
    (set, get) => ({
      entries: [],
      
      addEntry: (entryData) => {
        try {
          const entry: HealthEntry = {
            ...entryData,
            id: generateId(),
            createdAt: new Date().toISOString(),
          }
          
          console.log('Adding entry:', entry)
          
          set((state) => ({
            entries: [...state.entries, entry]
          }))
          
          console.log('Entry added successfully')
        } catch (error) {
          console.error('Error adding entry:', error)
          throw error
        }
      },
      
      updateEntry: (id, entryData) => {
        try {
          console.log('Updating entry:', { id, entryData })
          
          set((state) => ({
            entries: state.entries.map((entry) =>
              entry.id === id ? { ...entry, ...entryData } : entry
            )
          }))
          
          console.log('Entry updated successfully')
        } catch (error) {
          console.error('Error updating entry:', error)
          throw error
        }
      },
      
      getEntry: (date) => {
        const { entries } = get()
        return entries.find((entry) => entry.date === date)
      },
      
      getTodayEntry: () => {
        const today = format(new Date(), 'yyyy-MM-dd')
        return get().getEntry(today)
      },
      
      hasCheckedInToday: () => {
        const { entries } = get()
        return entries.some((entry) => isToday(new Date(entry.date)))
      },
      
      getWeekEntries: () => {
        const { entries } = get()
        const now = new Date()
        const weekStart = startOfWeek(now, { locale: id })
        const weekEnd = endOfWeek(now, { locale: id })
        
        return entries.filter((entry) => {
          const entryDate = new Date(entry.date)
          return entryDate >= weekStart && entryDate <= weekEnd
        })
      },
      
      getAverages: (entries) => {
        if (entries.length === 0) {
          return {
            energy: 0,
            focus: 0,
            stress: 0,
            mood: 0,
            sleep: 0,
            water: 0,
          }
        }
        
        const totals = entries.reduce(
          (acc, entry) => ({
            energy: acc.energy + entry.energy,
            focus: acc.focus + entry.focus,
            stress: acc.stress + entry.stress,
            mood: acc.mood + entry.mood,
            sleep: acc.sleep + entry.sleep,
            water: acc.water + entry.water,
          }),
          { energy: 0, focus: 0, stress: 0, mood: 0, sleep: 0, water: 0 }
        )
        
        return {
          energy: Math.round((totals.energy / entries.length) * 10) / 10,
          focus: Math.round((totals.focus / entries.length) * 10) / 10,
          stress: Math.round((totals.stress / entries.length) * 10) / 10,
          mood: Math.round((totals.mood / entries.length) * 10) / 10,
          sleep: Math.round((totals.sleep / entries.length) * 10) / 10,
          water: Math.round((totals.water / entries.length) * 10) / 10,
        }
      },
    }),
    {
      name: 'lunocare-health-data',
      onRehydrateStorage: () => (state) => {
        console.log('Hydration finished', state)
      },
      partialize: (state) => ({ entries: state.entries }),
    }
  )
)