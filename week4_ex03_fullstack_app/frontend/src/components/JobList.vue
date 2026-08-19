<script setup>
defineProps({
  jobs: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="job-list">
    <p v-if="jobs.length === 0" class="empty-state">
      No job listings yet — be the first employer to post one.
    </p>

    <article v-for="job in jobs" :key="job.id" class="job-card">
      <div class="job-card-header">
        <h3>{{ job.title }}</h3>
        <span class="job-location">{{ job.location }}</span>
      </div>
      <p class="job-company">{{ job.company }}</p>
      <p class="job-description">{{ job.description }}</p>
      <div class="job-actions">
        <button type="button" class="btn-edit" @click="emit('edit', job)">Edit</button>
        <button type="button" class="btn-delete" @click="emit('delete', job.id)">Delete</button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.job-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.empty-state {
  color: var(--muted);
  font-style: italic;
  padding: 32px 0;
  text-align: center;
}

.job-card {
  position: relative;
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 22px 22px 16px;
  border-top: 3px solid var(--accent);
}

.job-card::before {
  content: '';
  position: absolute;
  top: -7px;
  left: 26px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-dark);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.job-card-header h3 {
  font-size: 1.25rem;
  color: var(--ink);
}

.job-location {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.7rem;
  color: var(--muted);
  white-space: nowrap;
}

.job-company {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--accent-dark);
  margin: 4px 0 10px;
  font-size: 0.95rem;
}

.job-description {
  color: var(--ink-soft);
  font-size: 0.98rem;
  margin: 0 0 16px;
  white-space: pre-wrap;
}

.job-actions {
  display: flex;
  gap: 10px;
  border-top: 1px dashed var(--line);
  padding-top: 12px;
}

.btn-edit,
.btn-delete {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 7px 14px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.btn-edit {
  border-color: var(--ink);
  color: var(--ink);
}

.btn-edit:hover {
  background: var(--ink);
  color: var(--surface);
}

.btn-delete {
  border-color: var(--danger);
  color: var(--danger);
}

.btn-delete:hover {
  background: var(--danger);
  color: var(--surface);
}
</style>
