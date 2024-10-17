type FileUploadBodyDto = {
  userId: string;
  file_name?: string;
  hash_value: string;
  patient_name?: string;
  patient_age?: number;
  patient_sex?: string;
  date?: string;
  time?: string;
  muscle_name?: string;
  muscle_side?: string;
  amplitude?: number;
  sampling_frequency?: number;
  status: 'COMPLETED' | 'TO_DO' | 'NEED_REVIEW'
};

type FileIdDto = {
  id: string;
}

export { FileUploadBodyDto, FileIdDto };
