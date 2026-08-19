<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import JobList from './components/JobList.vue'
import PostJobForm from './components/PostJobForm.vue'

const API_URL = import.meta.env.VITE_API_URL

const jobs = ref([])
const editingJob = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

const fetchJobs = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await axios.get(`${API_URL}/jobs`)
    jobs.value = response.data
  } catch (err) {
    console.error('Failed to fetch jobs:', err)
    errorMessage.value = 'Could not load job listings. Is the backend running on port 5000?'
  } finally {
    isLoading.value = false
  }
}

const handleAddJob = async (jobData) => {
  errorMessage.value = ''
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData)
    jobs.value.unshift(response.data)
  } catch (err) {
    console.error('Failed to add job:', err)
    errorMessage.value = 'Could not post the job listing.'
  }
}

const handleUpdateJob = async ({ id, ...fields }) => {
  errorMessage.value = ''
  try {
    const response = await axios.put(`${API_URL}/jobs/${id}`, fields)
    const index = jobs.value.findIndex((job) => job.id === id)
    if (index !== -1) jobs.value[index] = response.data
    editingJob.value = null
  } catch (err) {
    console.error('Failed to update job:', err)
    errorMessage.value = 'Could not update the job listing.'
  }
}

const handleDeleteJob = async (id) => {
  errorMessage.value = ''
  try {
    await axios.delete(`${API_URL}/jobs/${id}`)
    jobs.value = jobs.value.filter((job) => job.id !== id)
    if (editingJob.value && editingJob.value.id === id) editingJob.value = null
  } catch (err) {
    console.error('Failed to delete job:', err)
    errorMessage.value = 'Could not delete the job listing.'
  }
}

const handleEditRequest = (job) => {
  editingJob.value = job
}

const handleCancelEdit = () => {
  editingJob.value = null
}

onMounted(fetchJobs)
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>JobBoard ZA</h1>
      <p class="tagline">Local jobs, posted by employers, ready for trainees to apply.</p>
    </header>

    <main class="app-main">
      <section class="form-section" aria-label="Post or edit a job listing">
        <PostJobForm
          :editing-job="editingJob"
          @add-job="handleAddJob"
          @update-job="handleUpdateJob"
          @cancel-edit="handleCancelEdit"
        />
      </section>

      <section class="list-section" aria-label="Current job listings">
        <p v-if="errorMessage" class="error-banner">{{ errorMessage }}</p>
        <p v-if="isLoading" class="status-message">Loading job listings…</p>
        <JobList v-else :jobs="jobs" @edit="handleEditRequest" @delete="handleDeleteJob" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.app-header {
  background: var(--ink);
  color: var(--canvas);
  margin: 0 -24px 40px;
  padding: 48px 24px 36px;
  text-align: center;
  border-bottom: 4px solid var(--accent);
}

.app-header h1 {
  font-size: clamp(2rem, 5vw, 2.75rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 700;
}

.tagline {
  font-family: var(--font-body);
  font-style: italic;
  color: #c7cdd6;
  margin: 10px 0 0;
  font-size: 1.05rem;
}

.app-main {
  display: grid;
  grid-template-columns: minmax(280px, 360px) 1fr;
  gap: 32px;
  align-items: start;
}

@media (max-width: 760px) {
  .app-main {
    grid-template-columns: 1fr;
  }
}

.status-message {
  color: var(--muted);
  font-style: italic;
}

.error-banner {
  background: #fbeae5;
  border: 1px solid var(--danger);
  color: var(--danger-dark);
  padding: 12px 16px;
  border-radius: var(--radius);
  margin: 0 0 16px;
  font-family: var(--font-display);
  font-size: 0.9rem;
}
</style>
