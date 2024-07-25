export interface taskTypes {
  id: number
  spanish_description: string
  english_description: string
}

export interface contactUsTypes {
  full_name: string
  email: string
  subject: string
  phone: string
  country: string
  city: string
}


export interface projectsTypes {
  id: number
  title: string
  spanish_description: string
  english_description: string
  image: string
  source_code: any
  preview_link: string
  languages: {
    html: {
      icon: any
      text: string | null
    }
    css: {
      icon: any
      text: string | null
    }
    javascript: {
      icon: any
      text: string | null
    }
    sass: {
      icon: any
      text: string | null
    }
    bootstrap: {
      icon: any
      text: string | null
    }
    typescript: {
      icon: any
      text: string | null
    }
    react: {
      icon: any
      text: string | null
    }
    nextjs: {
      icon: any
      text: string | null
    }
    mui: {
      icon: any
      text: string | null
    }
  }
}
