<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingJob: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['add-job', 'update-job', 'cancel-edit'])

const emptyForm = () => ({ title: '', company: '', location: '', description: '' })

const form = ref(emptyForm())
const isEditing = ref(false)

watch(
  () => props.editingJob,
  (job) => {
    if (job) {
      isEditing.value = true
      form.value = {
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description || ''
      }
    } else {
      isEditing.value = false
      form.value = emptyForm()
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  if (!form.value.title || !form.value.company || !form.value.location) return

  if (isEditing.value && props.editingJob) {
    emit('update-job', { id: props.editingJob.id, ...form.value })
  } else {
    emit('add-job', { ...form.value })
    form.value = emptyForm()
  }
}

const handleCancel = () => {
  emit('cancel-edit')
}
</script>

<template>
  <form class="job-form" @submit.prevent="handleSubmit">
    <h2>{{ isEditing ? 'Edit Job Listing' : 'Post a New Job' }}</h2>

    <div class="field">
      <label for="title">Job Title</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        placeholder="e.g. Junior Frontend Developer"
        required
      />
    </div>

    <div class="field">
      <label for="company">Company</label>
      <input
        id="company"
        v-model="form.company"
        type="text"
        placeholder="e.g. Cape Digital Solutions"
        required
      />
    </div>

    <div class="field">
      <label for="location">Location</label>
      <input
        id="location"
        v-model="form.location"
        type="text"
        placeholder="e.g. Cape Town, WC"
        required
      />
    </div>

    <div class="field">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        rows="4"
        placeholder="Responsibilities, requirements, how to apply…"
      ></textarea>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-primary">
        {{ isEditing ? 'Update Job' : 'Post Job' }}
      </button>
      <button v-if="isEditing" type="button" class="btn-secondary" @click="handleCancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<style scoped>
.job-form {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  border-top: 3px dashed var(--accent);
  padding: 24px;
}

.job-form h2 {
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
  color: var(--ink);
}

.field {
  margin-bottom: 16px;
}

.field label {
  display: block;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
  margin-bottom: 6px;
}

.field input,
.field textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 0.95rem;
  color: var(--ink);
  background: var(--canvas);
  resize: vertical;
}

.field input:focus,
.field textarea:focus {
  border-color: var(--accent);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.btn-primary,
.btn-secondary {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 11px 18px;
  border-radius: 6px;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
  flex: 1;
}

.btn-primary:hover {
  background: var(--accent-dark);
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--muted);
}

.btn-secondary:hover {
  border-color: var(--ink);
  color: var(--ink);
}
</style>
