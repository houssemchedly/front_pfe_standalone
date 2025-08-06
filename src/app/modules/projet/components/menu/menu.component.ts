import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { AppTopbar } from "../../../../layout/component/app.topbar"
import { AppSidebar } from "../../../../layout/component/app.sidebar"
import { ButtonModule } from "primeng/button"
import { InputTextModule } from "primeng/inputtext"
import { IconFieldModule } from "primeng/iconfield"
import { InputIconModule } from "primeng/inputicon"
import { DropdownModule } from "primeng/dropdown"

interface Project {
    id: number
    title: string
    description: string
    status: string
    createdDate: Date
}

interface DropdownOption {
    label: string
    value: string
}

@Component({
    selector: "app-menu",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        AppTopbar,
        AppSidebar,
        ButtonModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        DropdownModule,
    ],
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
    searchTerm = ""
    selectedStatus = ""
    selectedSort = "newest"

    statusOptions: DropdownOption[] = [
        { label: "All Status", value: "" },
        { label: "Active", value: "Active" },
        { label: "In Progress", value: "In Progress" },
        { label: "Completed", value: "Completed" },
        { label: "On Hold", value: "On Hold" },
        { label: "Cancelled", value: "Cancelled" },
        { label: "Planning", value: "Planning" },
    ]

    sortOptions: DropdownOption[] = [
        { label: "Newest First", value: "newest" },
        { label: "Oldest First", value: "oldest" },
        { label: "A-Z", value: "az" },
        { label: "Z-A", value: "za" },
    ]

    sampleProjects: Project[] = [
        {
            id: 1,
            title: "E-commerce Platform",
            description:
                "A comprehensive online shopping platform with advanced features including user authentication, payment processing, inventory management, and real-time analytics dashboard.",
            status: "Active",
            createdDate: new Date("2024-01-15"),
        },
        {
            id: 2,
            title: "Mobile Banking App",
            description: "Secure mobile banking application with biometric authentication.",
            status: "In Progress",
            createdDate: new Date("2024-02-20"),
        },
        {
            id: 3,
            title: "Task Management System",
            description:
                "An intuitive project management tool designed for teams to collaborate effectively, track progress, manage deadlines, assign tasks, and generate comprehensive reports for better productivity and workflow optimization.",
            status: "Completed",
            createdDate: new Date("2024-01-10"),
        },
        {
            id: 4,
            title: "Weather Dashboard",
            description: "Real-time weather monitoring and forecasting application.",
            status: "On Hold",
            createdDate: new Date("2024-03-05"),
        },
        {
            id: 5,
            title: "Social Media Analytics",
            description:
                "Advanced analytics platform for social media performance tracking, engagement metrics, audience insights, competitor analysis, and automated reporting with customizable dashboards and data visualization tools.",
            status: "Active",
            createdDate: new Date("2024-02-28"),
        },
        {
            id: 6,
            title: "Learning Management System",
            description: "Educational platform for online courses and student progress tracking.",
            status: "In Progress",
            createdDate: new Date("2024-01-25"),
        },
        {
            id: 7,
            title: "Inventory Management",
            description: "Complete inventory tracking and management system for warehouses.",
            status: "Planning",
            createdDate: new Date("2024-03-01"),
        },
        {
            id: 8,
            title: "Customer Support Portal",
            description: "Comprehensive customer support and ticketing system.",
            status: "Cancelled",
            createdDate: new Date("2024-02-15"),
        },
    ]

    filteredProjects: Project[] = []

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.applyFilters()
    }

    applyFilters(): void {
        let filtered = [...this.sampleProjects]

        // Apply search filter
        if (this.searchTerm.trim()) {
            const searchLower = this.searchTerm.toLowerCase()
            filtered = filtered.filter(
                (project) =>
                    project.title.toLowerCase().includes(searchLower) ||
                    project.description.toLowerCase().includes(searchLower) ||
                    project.status.toLowerCase().includes(searchLower),
            )
        }

        // Apply status filter
        if (this.selectedStatus) {
            filtered = filtered.filter((project) => project.status === this.selectedStatus)
        }

        // Apply sorting
        switch (this.selectedSort) {
            case "newest":
                filtered.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
                break
            case "oldest":
                filtered.sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime())
                break
            case "az":
                filtered.sort((a, b) => a.title.localeCompare(b.title))
                break
            case "za":
                filtered.sort((a, b) => b.title.localeCompare(a.title))
                break
        }

        this.filteredProjects = filtered
    }

    onSearchChange(): void {
        this.applyFilters()
    }

    onStatusChange(): void {
        this.applyFilters()
    }

    onSortChange(): void {
        this.applyFilters()
    }

    clearFilters(): void {
        this.searchTerm = ""
        this.selectedStatus = ""
        this.selectedSort = "newest"
        this.applyFilters()
    }

    hasActiveFilters(): boolean {
        return this.searchTerm.trim() !== "" || this.selectedStatus !== ""
    }

    getStatusClass(status: string): string {
        switch (status) {
            case "Active":
                return "status-active"
            case "In Progress":
                return "status-in-progress"
            case "Completed":
                return "status-completed"
            case "On Hold":
                return "status-on-hold"
            case "Cancelled":
                return "status-cancelled"
            case "Planning":
                return "status-planning"
            default:
                return "status-default"
        }
    }

    viewProject(projectId: number): void {
        this.router.navigate(["/projet/detail", projectId])
    }
}
