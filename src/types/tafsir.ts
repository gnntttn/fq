export interface TafsirAudio {
  id: number;
  name: string;
  url: string;
  tafsir_name: string;
  language: string;
}

export interface TafsirSeries {
  name: string;
  language: string;
  audios: TafsirAudio[];
}
