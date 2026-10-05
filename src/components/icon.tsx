'use client'

/**
 * Bootstrap Icons wrapper — single source of truth for all icons in the app.
 * Uses react-bootstrap-icons (Bootstrap Icons) under the hood.
 *
 * Each icon is exported under BOTH its Bootstrap name AND a lucide-style alias,
 * so callers can import either form:
 *
 *   import { Search, Siren, Heart } from '@/components/icon'
 *   <Search className="h-4 w-4" />
 *
 *   import { Icon } from '@/components/icon'
 *   <Icon name="search" className="h-4 w-4" />
 */

import {
  Search as BSSearch,
  List as BSList,
  X as BSX,
  Sun as BSSun,
  MoonStars as BSMoonStars,
  Globe as BSGlobe,
  Stars as BSStars,
  Heart as BSHeart,
  HeartFill as BSHeartFill,
  ChevronRight as BSChevronRight,
  ChevronDown as BSChevronDown,
  ChevronLeft as BSChevronLeft,
  ChevronUp as BSChevronUp,
  Building as BSBuilding,
  BuildingFill as BSBuildingFill,
  Bank as BSBank,
  Bank2 as BSBank2,
  GeoAlt as BSGeoAlt,
  GeoAltFill as BSGeoAltFill,
  FileText as BSFileText,
  MegaphoneFill as BSMegaphoneFill,
  Briefcase as BSBriefcase,
  InfoCircle as BSInfoCircle,
  Telephone as BSTelephone,
  TelephoneFill as BSTelephoneFill,
  House as BSHouse,
  HouseFill as BSHouseFill,
  ArrowRight as BSArrowRight,
  ArrowLeft as BSArrowLeft,
  ArrowRightShort as BSArrowRightShort,
  CheckCircle as BSCheckCircle,
  CheckCircleFill as BSCheckCircleFill,
  BoxArrowUpRight as BSBoxArrowUpRight,
  Clock as BSClock,
  ClockFill as BSClockFill,
  Envelope as BSEnvelope,
  EnvelopeFill as BSEnvelopeFill,
  ShieldCheck as BSShieldCheck,
  ShieldFillCheck as BSShieldFillCheck,
  Database as BSDatabase,
  Lock as BSLock,
  CodeSlash as BSCodeSlash,
  Server as BSServer,
  Send as BSSend,
  SendFill as BSSendFill,
  ArrowRepeat as BSArrowRepeat,
  Person as BSPerson,
  ExclamationCircle as BSExclamationCircle,
  Calendar as BSCalendar,
  Calendar3 as BSCalendar3,
  GraphUpArrow as BSGraphUpArrow,
  Trash as BSTrash,
  Sliders as BSSliders,
  People as BSPeople,
  PeopleFill as BSPeopleFill,
  Link45deg as BSLink45deg,
  Github as BSGithub,
  Funnel as BSFunnel,
  Bell as BSBell,
  CardChecklist as BSCardChecklist,
  Grid as BSGrid,
  GridFill as BSGridFill,
  Buildings as BSBuildings,
  Lightbulb as BSLightbulb,
  RocketTakeoff as BSRocketTakeoff,
  CloudCheck as BSCloudCheck,
  PencilSquare as BSPencilSquare,
  Download as BSDownload,
  Eye as BSEye,
  EyeFill as BSEyeFill,
  Plus as BSPlus,
  Bookmark as BSBookmark,
  BookmarkFill as BSBookmarkFill,
  Star as BSStar,
  StarFill as BSStarFill,
  LightningCharge as BSLightningCharge,
  Plug as BSPlug,
  Droplet as BSDroplet,
  Fire as BSFire,
  Truck as BSTruck,
  CarFront as BSCarFront,
  TrainFront as BSTrainFront,
  Airplane as BSAirplane,
  Book as BSBook,
  JournalText as BSJournalText,
  Camera as BSCamera,
  MusicNote as BSMusicNote,
  Mic as BSMic,
  Play as BSPlay,
  Pause as BSPause,
  ArrowUp as BSArrowUp,
  ArrowDown as BSArrowDown,
} from 'react-bootstrap-icons'

// ─── Export each icon under its Bootstrap name ───
export const Search = BSSearch
export const ListIcon = BSList
export const List = BSList
export const X = BSX
export const Sun = BSSun
export const MoonStars = BSMoonStars
export const Globe = BSGlobe
export const Stars = BSStars
export const Heart = BSHeart
export const HeartFill = BSHeartFill
export const ChevronRight = BSChevronRight
export const ChevronDown = BSChevronDown
export const ChevronLeft = BSChevronLeft
export const ChevronUp = BSChevronUp
export const Building = BSBuilding
export const BuildingFill = BSBuildingFill
export const Bank = BSBank
export const Bank2 = BSBank2
export const GeoAlt = BSGeoAlt
export const GeoAltFill = BSGeoAltFill
export const FileText = BSFileText
export const MegaphoneFill = BSMegaphoneFill
export const Briefcase = BSBriefcase
export const InfoCircle = BSInfoCircle
export const Telephone = BSTelephone
export const TelephoneFill = BSTelephoneFill
export const House = BSHouse
export const HouseFill = BSHouseFill
export const ArrowRight = BSArrowRight
export const ArrowLeft = BSArrowLeft
export const ArrowRightShort = BSArrowRightShort
export const CheckCircle = BSCheckCircle
export const CheckCircleFill = BSCheckCircleFill
export const BoxArrowUpRight = BSBoxArrowUpRight
export const Clock = BSClock
export const ClockFill = BSClockFill
export const Envelope = BSEnvelope
export const EnvelopeFill = BSEnvelopeFill
export const ShieldCheck = BSShieldCheck
export const ShieldFillCheck = BSShieldFillCheck
export const Database = BSDatabase
export const Lock = BSLock
export const CodeSlash = BSCodeSlash
export const Server = BSServer
export const Send = BSSend
export const SendFill = BSSendFill
export const ArrowRepeat = BSArrowRepeat
export const Person = BSPerson
export const ExclamationCircle = BSExclamationCircle
export const Calendar = BSCalendar
export const Calendar3 = BSCalendar3
export const GraphUpArrow = BSGraphUpArrow
export const Trash = BSTrash
export const Sliders = BSSliders
export const People = BSPeople
export const PeopleFill = BSPeopleFill
export const Link45deg = BSLink45deg
export const Github = BSGithub
export const Funnel = BSFunnel
export const Bell = BSBell
export const CardChecklist = BSCardChecklist
export const Grid = BSGrid
export const GridFill = BSGridFill
export const Buildings = BSBuildings
export const Lightbulb = BSLightbulb
export const RocketTakeoff = BSRocketTakeoff
export const CloudCheck = BSCloudCheck
export const PencilSquare = BSPencilSquare
export const Download = BSDownload
export const Eye = BSEye
export const EyeFill = BSEyeFill
export const Plus = BSPlus
export const Bookmark = BSBookmark
export const BookmarkFill = BSBookmarkFill
export const Star = BSStar
export const StarFill = BSStarFill
export const LightningCharge = BSLightningCharge
export const Plug = BSPlug
export const Droplet = BSDroplet
export const Fire = BSFire
export const Truck = BSTruck
export const CarFront = BSCarFront
export const TrainFront = BSTrainFront
export const Airplane = BSAirplane
export const Book = BSBook
export const JournalText = BSJournalText
export const Camera = BSCamera
export const MusicNote = BSMusicNote
export const Mic = BSMic
export const Play = BSPlay
export const Pause = BSPause
export const ArrowUp = BSArrowUp
export const ArrowDown = BSArrowDown

// ─── Lucide-style aliases (for ergonomic migration) ───
export const Sparkles = BSStars
export const Siren = BSMegaphoneFill
export const Landmark = BSBank
export const LandmarkFill = BSBank2
export const MapPin = BSGeoAlt
export const MapPinFill = BSGeoAltFill
export const Info = BSInfoCircle
export const Phone = BSTelephone
export const PhoneFill = BSTelephoneFill
export const Home = BSHouse
export const HomeFill = BSHouseFill
export const Building2 = BSBuilding
export const CheckCircle2 = BSCheckCircle
export const CheckCircle2Fill = BSCheckCircleFill
export const ExternalLink = BSBoxArrowUpRight
export const Mail = BSEnvelope
export const MailFill = BSEnvelopeFill
export const Shield = BSShieldCheck
export const ShieldFill = BSShieldFillCheck
export const Code = BSCodeSlash
export const Loader = BSArrowRepeat
export const Loader2 = BSArrowRepeat
export const User = BSPerson
export const Smartphone = BSPerson
export const AlertCircle = BSExclamationCircle
export const TrendingUp = BSGraphUpArrow
export const Trash2 = BSTrash
export const SlidersHorizontal = BSSliders
export const Users = BSPeople
export const UsersFill = BSPeopleFill
export const Link2 = BSLink45deg
export const Filter = BSFunnel
export const Rocket = BSRocketTakeoff
export const Scale = BSBank

/**
 * Universal <Icon name="..." /> component — accepts a `name` prop.
 */
import * as React from 'react'

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  search: BSSearch,
  menu: BSList,
  x: BSX,
  close: BSX,
  sun: BSSun,
  moon: BSMoonStars,
  globe: BSGlobe,
  sparkles: BSStars,
  heart: BSHeart,
  'heart-fill': BSHeartFill,
  'chevron-right': BSChevronRight,
  'chevron-down': BSChevronDown,
  'chevron-left': BSChevronLeft,
  'chevron-up': BSChevronUp,
  building: BSBuilding,
  'building-fill': BSBuildingFill,
  landmark: BSBank,
  'landmark-fill': BSBank2,
  bank: BSBank,
  'map-pin': BSGeoAlt,
  'map-pin-fill': BSGeoAltFill,
  'file-text': BSFileText,
  siren: BSMegaphoneFill,
  briefcase: BSBriefcase,
  info: BSInfoCircle,
  phone: BSTelephone,
  'phone-fill': BSTelephoneFill,
  home: BSHouse,
  'home-fill': BSHouseFill,
  'arrow-right': BSArrowRight,
  'arrow-left': BSArrowLeft,
  'arrow-right-short': BSArrowRightShort,
  'check-circle': BSCheckCircle,
  'check-circle-fill': BSCheckCircleFill,
  'external-link': BSBoxArrowUpRight,
  clock: BSClock,
  'clock-fill': BSClockFill,
  mail: BSEnvelope,
  'mail-fill': BSEnvelopeFill,
  shield: BSShieldCheck,
  'shield-fill': BSShieldFillCheck,
  database: BSDatabase,
  lock: BSLock,
  code: BSCodeSlash,
  server: BSServer,
  send: BSSend,
  'send-fill': BSSendFill,
  loader: BSArrowRepeat,
  user: BSPerson,
  'alert-circle': BSExclamationCircle,
  calendar: BSCalendar,
  'calendar-3': BSCalendar3,
  'trending-up': BSGraphUpArrow,
  trash: BSTrash,
  sliders: BSSliders,
  'sliders-horizontal': BSSliders,
  users: BSPeople,
  'users-fill': BSPeopleFill,
  link: BSLink45deg,
  'link-2': BSLink45deg,
  github: BSGithub,
  filter: BSFunnel,
  bell: BSBell,
  'card-checklist': BSCardChecklist,
  grid: BSGrid,
  'grid-fill': BSGridFill,
  buildings: BSBuildings,
  lightbulb: BSLightbulb,
  rocket: BSRocketTakeoff,
  'cloud-check': BSCloudCheck,
  'pencil-square': BSPencilSquare,
  download: BSDownload,
  eye: BSEye,
  'eye-fill': BSEyeFill,
  plus: BSPlus,
  bookmark: BSBookmark,
  'bookmark-fill': BSBookmarkFill,
  star: BSStar,
  'star-fill': BSStarFill,
  'lightning-charge': BSLightningCharge,
  plug: BSPlug,
  droplet: BSDroplet,
  fire: BSFire,
  truck: BSTruck,
  'car-front': BSCarFront,
  train: BSTrainFront,
  airplane: BSAirplane,
  book: BSBook,
  'journal-text': BSJournalText,
  camera: BSCamera,
  'music-note': BSMusicNote,
  mic: BSMic,
  play: BSPlay,
  pause: BSPause,
  'arrow-up': BSArrowUp,
  'arrow-down': BSArrowDown,
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof ICON_MAP | string
  size?: number | string
}

export function Icon({ name, size, className, ...rest }: IconProps) {
  const Cmp = ICON_MAP[name]
  if (!Cmp) {
    if (typeof console !== 'undefined') {
      console.warn(`[Icon] Unknown icon: ${name}`)
    }
    return null
  }
  const style = size ? { fontSize: typeof size === 'number' ? `${size}px` : size } : undefined
  return <Cmp className={className} style={style} aria-hidden {...rest} />
}

export default Icon
