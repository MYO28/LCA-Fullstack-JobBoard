const jobModel = require("../models/jobModel");

const getJobs = async (req, res) => {
  try {
    const jobs = await jobModel.getAll();
    res.json(jobs);
  } catch (err) {
    console.error("getJobs error:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const getJob = async (req, res) => {
  try {
    const job = await jobModel.getById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error("getJob error:", err);
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;
    if (!title || !company || !location) {
      return res.status(400).json({ error: "title, company, and location are required" });
    }
    const newJob = await jobModel.create({ title, company, location, description });
    res.status(201).json(newJob);
  } catch (err) {
    console.error("createJob error:", err);
    res.status(500).json({ error: "Failed to create job" });
  }
};

const updateJob = async (req, res) => {
  try {
    const existing = await jobModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Job not found" });

    const { title, company, location, description } = req.body;
    if (!title || !company || !location) {
      return res.status(400).json({ error: "title, company, and location are required" });
    }
    const updatedJob = await jobModel.update(req.params.id, { title, company, location, description });
    res.json(updatedJob);
  } catch (err) {
    console.error("updateJob error:", err);
    res.status(500).json({ error: "Failed to update job" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const existing = await jobModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Job not found" });

    await jobModel.remove(req.params.id);
    res.json({ message: "Job deleted", id: Number(req.params.id) });
  } catch (err) {
    console.error("deleteJob error:", err);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob };
